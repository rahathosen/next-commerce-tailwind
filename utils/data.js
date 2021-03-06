import bcrypt from 'bcryptjs';

const data = {
	users: [
		{
			name: 'Rahat',
			email: 'rahat@example.com',
			password: bcrypt.hashSync('123456'),
			isAdmin: true
		},
		{
			name: 'Hosen',
			email: 'hosen@example.com',
			password: bcrypt.hashSync('123456'),
			isAdmin: false
		}
	],
	products: [
		{
			name: 'Free Shirt',
			slug: 'free-shirt',
			category: 'Shirts',
			image: '/images/shirt1.jpg',
			price: 70,
			brand: 'Nike',
			rating: 4.5,
			numReviews: 10,
			countInStock: 12,
			description: 'A popular shirt'
		},
		{
			name: 'Slim Shirt',
			slug: 'slim-shirt',
			category: 'Shirts',
			image: '/images/shirt3.jpg',
			price: 99,
			brand: 'Raymond',
			rating: 4.5,
			numReviews: 10,
			countInStock: 120,
			description: 'A popular shirt'
		},
		{
			name: 'Free Shirt2',
			slug: 'free-shirt2',
			category: 'Shirts',
			image: '/images/shirt1-2.jpg',
			price: 39,
			brand: 'Nike',
			rating: 4.5,
			numReviews: 10,
			countInStock: 20,
			description: 'A popular shirt'
		},
		{
			name: 'Free Shirt3',
			slug: 'free-shirt3',
			category: 'Shirts',
			image: '/images/shirt1-3.jpg',
			price: 69,
			brand: 'Nike',
			rating: 4.5,
			numReviews: 10,
			countInStock: 50,
			description: 'A popular shirt'
		},
		{
			name: 'Free Shirt4',
			slug: 'free-shirt4',
			category: 'Shirts',
			image: '/images/shirt1-4.jpg',
			price: 70,
			brand: 'Nike',
			rating: 4.5,
			numReviews: 10,
			countInStock: 5,
			description: 'A popular shirt'
		},
		{
			name: 'Fit Shirt',
			slug: 'fit-shirt',
			category: 'Shirts',
			image: '/images/shirt2.jpg',
			price: 80,
			brand: 'Adidas',
			rating: 4.2,
			numReviews: 10,
			countInStock: 15,
			description: 'A popular shirt'
		},

		{
			name: 'Golf Pants',
			slug: 'golf-pants',
			category: 'Pants',
			image: '/images/pants1.jpg',
			price: 90,
			brand: 'Oliver',
			rating: 4.5,
			numReviews: 10,
			countInStock: 29,
			description: 'Smart looking pants'
		},
		{
			name: 'Fit Pants',
			slug: 'fit-pants',
			category: 'Pants',
			image: '/images/pants2.jpg',
			price: 95,
			brand: 'Zara',
			rating: 4.5,
			numReviews: 10,
			countInStock: 80,
			description: 'A popular pants'
		},
		{
			name: 'Classic Pants',
			slug: 'classic-pants',
			category: 'Pants',
			image: '/images/pants3.jpg',
			price: 75,
			brand: 'Casely',
			rating: 4.5,
			numReviews: 10,
			countInStock: 7,
			description: 'A popular pants'
		}
	]
};
export default data;
