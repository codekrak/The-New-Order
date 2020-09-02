const backendApiUrl = "https://3000-b482edc3-9165-4e55-917b-cfd3f78431ee.ws-us02.gitpod.io/";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			vendor_locations: [
				{
					vendor_id: 1,
					name: "Bob's Burgers",
					lat: 25.7617,
					lng: -80.1918
				},
				{
					vendor_id: 2,
					name: "Magic Tacos",
					lat: 25.7598,
					lng: -80.1916
				},
				{
					vendor_id: 3,
					name: "Willy Wonkas",
					lat: 25.7623,
					lng: -80.1921
				},
				{
					vendor_id: 4,
					name: "Cupcake Kingdom",
					lat: 25.7631,
					lng: -80.1919
				}
			],
			categories: ["Beverages", "Appetizers", "Sandwiches", "Entrees", "Desserts"],
			vendors: [
				{
					email: "hotty@gmail.com",
					id: 1,
					orders: [],
					phone: "1234567895",
					products: [],
					vendor_name: "hot toddy"
				},
				{
					email: "juicy@gmail.com",
					id: 3,
					orders: [],
					phone: "1234567807",
					products: [
						{
							category: "beverages",
							description: "wheat ale",
							id: 1,
							name: "Blue Moon",
							price: "3.0",
							vendor_id: 3
						}
					],
					vendor_name: "juicy"
				}
			],
			orders: [
				{
					id: 1,
					name: "Ernesto Medina",
					email: "ernesto.m.medina.m@gmail.com",
					phone: "+584143026661",
					created_at: new Date().toISOString,
					started_at: new Date().toISOString,
					cancel_order: null,
					closed_at: null,
					expected_pickup: null,
					vendor_id: 1,
					sub_total_price: 12.5,
					total_proce: 12.5 * 1.07
				},
				{
					id: 2,
					name: "Ernesto Medina",
					email: "ernesto.m.medina.m@gmail.com",
					phone: "+584143026661",
					created_at: new Date().toISOString,
					started_at: new Date().toISOString,
					cancel_order: null,
					closed_at: null,
					expected_pickup: null,
					vendor_id: 1,
					sub_total_price: 12.5,
					total_proce: 12.5 * 1.07
				},
				{
					id: 3,
					name: "Horacio Medina",
					email: "horacio@gmail.com",
					phone: "+584143026558",
					created_at: new Date().toISOString,
					started_at: new Date().toISOString,
					cancel_order: null,
					closed_at: new Date().toISOString,
					expected_pickup: null,
					vendor_id: 1,
					sub_total_price: 12.5,
					total_proce: 12.5 * 1.07
				},
				{
					id: 4,
					name: "Daniel Medina",
					email: "danielmedinam@gmail.com",
					phone: "+584142283868",
					created_at: new Date().toISOString,
					started_at: null,
					cancel_order: null,
					closed_at: null,
					expected_pickup: null,
					vendor_id: 1,
					sub_total_price: 15.0,
					total_proce: 15.0 * 1.07
				},
				{
					id: 5,
					name: "Simon Bolivar",
					email: "simon_bolivar@gmail.com",
					phone: "+584142283868",
					created_at: new Date().toISOString,
					started_at: null,
					cancel_order: null,
					closed_at: null,
					expected_pickup: null,
					vendor_id: 1,
					sub_total_price: 15.0,
					total_proce: 15.0 * 1.07
				},
				{
					id: 6,
					name: "Someone Else",
					email: "someone@gmail.com",
					phone: "+584142283868",
					created_at: new Date().toISOString,
					started_at: null,
					cancel_order: null,
					closed_at: null,
					expected_pickup: null,
					vendor_id: 1,
					sub_total_price: 15.0,
					total_price: 15.0 * 1.07
				}
			],
			orderForDetail: {},
			orderItem: {
				id: 1,
				order_id: 1,
				product_id: 1,
				quantity: 2,
				unit_price: 5.0,
				special_instructions: null
			}
		},
		actions: {
			getResults: searchName => {
				const store = getStore();
				fetch(`${backendApiUrl}vendors?name=${searchName}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(result => setStore({ searchResults: result }));
			},
			// Use getActions to call a function within a fuction
			updateOrder: async (updateDict, orderId) => {
				const url = `${backendApiUrl}orders/${orderId}`;
				// here your would fetch this url with the updateDict
				// which will always be an object with properties and
				// values to be updated for the order with id = orderId
				// for now we just update the given order in the store
				const store = getStore();
				let updatedOrder = {};
				let updatedList = [];
				for (let order of store.orders) {
					if (order.id == orderId) {
						Object.assign(updatedOrder, order, updateDict);
						updatedList.push(updatedOrder);
					} else {
						updatedList.push(order);
					}
				}
				setStore({
					orders: updatedList
				});
			},
			protectedEndpoint: () => {
				const store = getStore();
				fetch(`${backendApiUrl}profile`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${store.token}`
					}
				});
			},
			login: (email, password) => {
				console.log("Hello");
				fetch(`${backendApiUrl}login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},

					body: JSON.stringify({
						email: email,
						password: password
					})
				})
					.then(response => response.json())
					.then(token => {
						if (typeof token.msg != "undefined") {
							// Notify.error(token.msg);
						} else {
							setStore({ token: token.jwt });
						}
					});
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signUp: async (vendor_name, email, password, phone) => {
				let response = await fetch(backendApiUrl + "signup", {
					method: "POST",
					body: JSON.stringify({
						vendor_name: vendor_name,
						email: email,
						password: password,
						phone: phone
					}),
					headers: {
						"Content-Type": "application/json"
					}
				});
				if (response.ok) {
					await getActions().login(email, password);
					return true;
				} else {
					return false;
				}
			},
			//shopping cart requests
			addCartItem: async (name, special_instructions, id, unit_price, order_id) => {
				let response = await fetch(backendApiUrl + "user-main-menu/" + order_id, {
					method: "POST",
					body: JSON.stringify({
						name: name,
						special_instructions: special_instructions,
						id: id,
						unit_price: unit_price,
						order_id: order_id
					}),
					headers: {
						"Content-Type": "application/json"
					}
				});
			},
			deleteCartItem: async (name, special_instructions, id, unit_price) => {
				let response = await fetch(backendApiUrl + "user-main-menu/" + id, {
					//would be id or order_id that goes here
					method: "DELETE",
					body: JSON.stringify({
						name: name,
						special_instructions: special_instructions,
						id: id,
						unit_price: unit_price
					}),
					headers: {
						"Content-Type": "application/json"
					}
				});
			}
		}
	};
};

export default getState;
