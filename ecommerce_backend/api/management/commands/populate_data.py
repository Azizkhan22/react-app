from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Category, Product, Review

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')

        # Create categories
        categories_data = [
            {
                'name': "Men's Fashion",
                'image': "https://asset1.marksandspencer.com/is/image/mands/150827_BSLH-8586_TS_Suiting_final_03.jpg?wid=770",  
                'count': 100
            },
            {
                'name': "Women's Fashion",
                'image': "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",  
                'count': 120
            },
            {
                'name': "Kids Fashion",
                'image': "https://petitekingdom.com/wp-content/uploads/2022/01/kleitas-meitenem-petite-kingdom-1024x682.jpg",  
                'count': 80
            },
            {
                'name': "Footwear",
                'image': "https://housershoes.com/cdn/shop/files/23FW_SportsMom_OM_151183_151181_082_even_lower_cropped.jpg?crop=region&crop_height=1600&crop_left=0&crop_top=152&crop_width=1600&v=1741787825&width=1600",  
                'count': 60
            }
        ]

        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(f'Created category: {category.name}')


        products_data = [
            # Men's Fashion
            {
                'name': "Men's Classic Shirt",
                'description': "A timeless classic t-shirt for men. Soft, comfortable, and perfect for everyday wear.",
                'price': 19.99,
                'original_price': 29.99,
                'discount': 33,
                'rating': 4.5,
                'reviews_count': 45,
                'sku': "MTS-001",
                'category': categories["Men's Fashion"],
                'in_stock': True,
                'colors': ["White", "Black", "Navy"],
                'sizes': ["S", "M", "L", "XL"],
                'features': [
                    "100% cotton",
                    "Regular fit",
                    "Machine washable"
                ],
                'images': ["https://storefico.com/wp-content/uploads/2022/01/IMG_7015-2-59-scaled.jpg"]
            },
            {
                'name': "Men's Slim Fit Jeans",
                'description': "Stylish slim fit jeans for men. Durable and comfortable for all-day wear.",
                'price': 39.99,
                'original_price': 49.99,
                'discount': 20,
                'rating': 4.2,
                'reviews_count': 32,
                'sku': "MJ-001",
                'category': categories["Men's Fashion"],
                'in_stock': True,
                'colors': ["Blue", "Black"],
                'sizes': ["30", "32", "34", "36"],
                'features': [
                    "Slim fit",
                    "Stretch fabric",
                    "Classic 5-pocket style"
                ],
                'images': ["https://www.mangooutlet.com/assets/rcs/pics/static/T7/fotos/S/77050594_TM.jpg?imwidth=2048&imdensity=1&ts=1715269240341"]
            },
            # Women's Fashion
            {
                'name': "Women's Summer Dress",
                'description': "Lightweight and breezy summer dress for women. Perfect for warm days and casual outings.",
                'price': 29.99,
                'original_price': 39.99,
                'discount': 25,
                'rating': 4.7,
                'reviews_count': 58,
                'sku': "WSD-001",
                'category': categories["Women's Fashion"],
                'in_stock': True,
                'colors': ["Red", "Blue", "Yellow"],
                'sizes': ["XS", "S", "M", "L"],
                'features': [
                    "Lightweight fabric",
                    "Floral print",
                    "Adjustable straps"
                ],
                'images': ["https://img.theloom.in/blog/wp-content/uploads/2022/05/dsc02011-e1652506726503.png"]
            },
            {
                'name': "Women's Denim Jacket",
                'description': "Trendy denim jacket for women. Layer up in style for any season.",
                'price': 49.99,
                'original_price': 59.99,
                'discount': 17,
                'rating': 4.4,
                'reviews_count': 40,
                'sku': "WDJ-001",
                'category': categories["Women's Fashion"],
                'in_stock': True,
                'colors': ["Blue", "Black"],
                'sizes': ["S", "M", "L", "XL"],
                'features': [
                    "Classic denim",
                    "Button closure",
                    "Two front pockets"
                ],
                'images': ["https://image.made-in-china.com/2f0j00sZelVUHPagrR/High-Quality-Blue-Oversized-Long-Denim-Jackets-Distressed-Womens-Jean-Jacket-Wholesale-Denim-Jackets.webp"]
            },
            # Kids' Fashion
            {
                'name': "Kids' Graphic Tee",
                'description': "Fun and colorful graphic t-shirt for kids. Soft and comfortable for playtime.",
                'price': 14.99,
                'original_price': 19.99,
                'discount': 25,
                'rating': 4.6,
                'reviews_count': 22,
                'sku': "KGT-001",
                'category': categories["Kids Fashion"],
                'in_stock': True,
                'colors': ["Green", "Yellow", "Pink"],
                'sizes': ["2T", "3T", "4T", "5T"],
                'features': [
                    "Soft cotton",
                    "Fun print",
                    "Easy care"
                ],
                'images': ["https://vivamake.com/wp-content/uploads/2020/08/kid-tshirt-with-print-black-monster.jpg"]
            },
            {
                'name': "Kids' Jogger Pants",
                'description': "Comfortable jogger pants for kids. Great for active days and lounging.",
                'price': 19.99,
                'original_price': 24.99,
                'discount': 20,
                'rating': 4.3,
                'reviews_count': 18,
                'sku': "KJP-001",
                'category': categories["Kids Fashion"],
                'in_stock': True,
                'colors': ["Gray", "Navy"],
                'sizes': ["2T", "3T", "4T", "5T"],
                'features': [
                    "Elastic waistband",
                    "Ribbed cuffs",
                    "Side pockets"
                ],
                'images': ["https://m.media-amazon.com/images/I/61pwUr17h2L.jpg"]
            },
            # Footwear
            {
                'name': "Men's Running Shoes",
                'description': "Lightweight and supportive running shoes for men. Designed for comfort and performance.",
                'price': 59.99,
                'original_price': 79.99,
                'discount': 25,
                'rating': 4.8,
                'reviews_count': 60,
                'sku': "MRS-001",
                'category': categories["Footwear"],
                'in_stock': True,
                'colors': ["Black", "White", "Gray"],
                'sizes': ["8", "9", "10", "11", "12"],
                'features': [
                    "Breathable mesh",
                    "Cushioned sole",
                    "Lightweight design"
                ],
                'images': ["https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/16/16-best-long-distance-running-shoes-15275091-main.jpg"]
            },
            {
                'name': "Women's Sandals",
                'description': "Comfortable and stylish sandals for women. Perfect for summer days.",
                'price': 24.99,
                'original_price': 34.99,
                'discount': 29,
                'rating': 4.5,
                'reviews_count': 35,
                'sku': "WSD-002",
                'category': categories["Footwear"],
                'in_stock': True,
                'colors': ["Beige", "White", "Black"],
                'sizes': ["6", "7", "8", "9"],
                'features': [
                    "Adjustable straps",
                    "Non-slip sole",
                    "Lightweight"
                ],
                'images': ["https://heelsshoes.pk/cdn/shop/files/060008-MGR.jpg?v=1752261191"]
            }
        ]

        for product_data in products_data:
            product, created = Product.objects.get_or_create(
                sku=product_data['sku'],
                defaults=product_data
            )
            if created:
                self.stdout.write(f'Created product: {product.name}')

        # Create a test user
        user, created = User.objects.get_or_create(
            username='testuser',
            defaults={
                'email': 'test@example.com',
                'first_name': 'Test',
                'last_name': 'User'
            }
        )
        if created:
            user.set_password('testpass123')
            user.save()
            self.stdout.write('Created test user: testuser (password: testpass123)')

        # Create some reviews
        reviews_data = [
            {
                'product': Product.objects.get(sku="MTS-001"),
                'user': user,
                'rating': 5,
                'comment': "Great quality t-shirt, fits perfectly!"
            },
            {
                'product': Product.objects.get(sku="WSD-001"),
                'user': user,
                'rating': 4,
                'comment': "Lovely summer dress, very comfortable."
            },
            {
                'product': Product.objects.get(sku="MRS-001"),
                'user': user,
                'rating': 5,
                'comment': "Best running shoes I've owned!"
            }
        ]

        for review_data in reviews_data:
            review, created = Review.objects.get_or_create(
                product=review_data['product'],
                user=review_data['user'],
                defaults=review_data
            )
            if created:
                self.stdout.write(f'Created review for {review.product.name}')

        self.stdout.write(self.style.SUCCESS('Successfully populated database with sample data!')) 