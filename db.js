let db = [
	{
		id: 1,
		name: 'john',
		authoris: false,
		pass: '1',
		access:['add', 'delete', 'edit']
	},
	{
		id: 2,
		name: 'bob',
		authoris: false,
		pass: '1',
		access:['add', 'edit']
	},
	{
		id: 3,
		name: 'bill',
		authoris: false,
		pass: '1',
		access:['add']
	},
	{
		id: 4,
		name: 'sara',
		authoris: false,
		pass: '1',
		access:[]
	}
];



exports.get = () => db;

exports.delete = (id) => (
	db = db.filter(item => item.id !== id)
);

exports.put = (name, id) => (
	db = db.map(item => {
		if (item.id == id) item.name = name
		return item
	})
);

exports.set = (obj) => db.push(obj)