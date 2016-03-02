# sequelizejs-multi-table-query-example
a demo use sequelizejs to select from two or more table (associations)


query result

```
[{
	"id": 1,
	"name": "user1",
	"password": "1",
	"note": null,
	"userMsg": [{
		"id": "112",
		"date": "1456886732567",
		"content": "22222",
		"isread": "0",
		"sender": 2,
		"receiver": 1
	}]
}, {
	"id": 2,
	"name": "user2",
	"password": "2",
	"note": null,
	"userMsg": [{
		"id": "111",
		"date": "1456886732565",
		"content": "11111",
		"isread": "0",
		"sender": 1,
		"receiver": 2
	}, {
		"id": "222",
		"date": "1456886732567",
		"content": "11112",
		"isread": "0",
		"sender": 1,
		"receiver": 2
	}]
}]
```
