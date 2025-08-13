from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.db.models import Q, Avg
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Category, Product, Review, Cart, Wishlist, Order, OrderItem
from .serializers import (
    CategorySerializer, ProductSerializer, ProductListSerializer,
    ReviewSerializer, CartSerializer, WishlistSerializer,
    OrderSerializer, OrderItemSerializer, CreateReviewSerializer,
    UserSerializer
)

# Authentication Views
@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            serializer = UserSerializer(user)
            return Response({
                'message': 'Login successful',
                'user': serializer.data
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        
        if not username or not email or not password:
            return Response({'error': 'Username, email, and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            login(request, user)
            serializer = UserSerializer(user)
            return Response({
                'message': 'Registration successful',
                'user': serializer.data
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CheckAuthView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response({'authenticated': True, 'user': serializer.data})
        return Response({'authenticated': False})

# Existing Views...
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        category = self.get_object()
        products = Product.objects.filter(category=category)
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductSerializer
        return ProductListSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        
        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__name__icontains=category)
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Search by name
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )
        
        # Sort by
        sort_by = self.request.query_params.get('sort_by', None)
        if sort_by == 'price_low':
            queryset = queryset.order_by('price')
        elif sort_by == 'price_high':
            queryset = queryset.order_by('-price')
        elif sort_by == 'rating':
            queryset = queryset.order_by('-rating')
        elif sort_by == 'newest':
            queryset = queryset.order_by('-created_at')
        
        return queryset

    @action(detail=True, methods=['post'])
    def add_review(self, request, pk=None):
        product = self.get_object()
        serializer = CreateReviewSerializer(
            data=request.data,
            context={'product_id': product.id, 'user': request.user}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_products = Product.objects.filter(rating__gte=4.0)[:8]
        serializer = ProductListSerializer(featured_products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def related(self, request):
        product_id = request.query_params.get('product_id')
        if product_id:
            try:
                product = Product.objects.get(id=product_id)
                related_products = Product.objects.filter(
                    category=product.category
                ).exclude(id=product_id)[:4]
                serializer = ProductListSerializer(related_products, many=True)
                return Response(serializer.data)
            except Product.DoesNotExist:
                return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'product_id parameter required'}, status=status.HTTP_400_BAD_REQUEST)

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def total(self, request):
        cart_items = self.get_queryset()
        total = sum(item.product.price * item.quantity for item in cart_items)
        count = sum(item.quantity for item in cart_items)
        return Response({
            'total': total,
            'count': count,
            'items': CartSerializer(cart_items, many=True).data
        })

    @action(detail=True, methods=['post'])
    def update_quantity(self, request, pk=None):
        cart_item = get_object_or_404(Cart, id=pk, user=request.user)
        quantity = request.data.get('quantity', 1)
        
        if quantity <= 0:
            cart_item.delete()
            return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)
        
        cart_item.quantity = quantity
        cart_item.save()
        serializer = CartSerializer(cart_item)
        return Response(serializer.data)

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def toggle(self, request):
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({'error': 'product_id required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            product = Product.objects.get(id=product_id)
            wishlist_item, created = Wishlist.objects.get_or_create(
                user=request.user,
                product=product
            )
            
            if not created:
                wishlist_item.delete()
                return Response({'message': 'Removed from wishlist'}, status=status.HTTP_200_OK)
            
            return Response({'message': 'Added to wishlist'}, status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Generate order number
        import uuid
        order_number = f"ORD-{uuid.uuid4().hex[:8].upper()}"
        serializer.save(user=self.request.user, order_number=order_number)

    @action(detail=False, methods=['post'])
    def create_from_cart(self, request):
        cart_items = Cart.objects.filter(user=request.user)
        if not cart_items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Calculate total
        total_amount = sum(item.product.price * item.quantity for item in cart_items)
        
        # Create order
        import uuid
        order = Order.objects.create(
            user=request.user,
            order_number=f"ORD-{uuid.uuid4().hex[:8].upper()}",
            total_amount=total_amount,
            shipping_address=request.data.get('shipping_address', ''),
            payment_method=request.data.get('payment_method', 'credit_card')
        )
        
        # Create order items
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
        
        # Clear cart
        cart_items.delete()
        
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
