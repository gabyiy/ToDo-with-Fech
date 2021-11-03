import React, { useState, useEffect } from "react";
import { DeleteAllBut } from "./DeleteAllBut.js";
import { NothingToDel } from "./NothingToDel";

export function Home() {
	const [inputValue, setInputValue] = useState("");
	const [todo, setTodo] = useState([]);
	let [counter, setCounter] = useState(0);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/gabi", {
			method: "GET"
		}).then(response => {
			if (response.status == 404) {
				createUser("gabi");
			} else {
				getList("gabi");
			}
		});
	}, []);

	const getList = user => {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: "GET"
		})
			.then(response => response.json())
			.then(data => setTodo(data));
	};

	const createUser = user => {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify([])
		})
			.then(response => response.json())
			.then(data => setTodo(data));
	};
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/gabi", {
			method: "GET",
			headers: {
				"Content-type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => setTodo(data))
			.catch(error => console.log("[ERROR TO GET LIST", error));
	}, []);
	const addTodo = text => {
		console.log("texto", text);
		let newTodo = [...todo, { label: text, done: false }];

		console.log("nueva lista", newTodo);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/gabi", {
			method: "PUT",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(newTodo)
		})
			.then(response => response.json())
			.then(data => {
				setInputValue("");
				setTodo(newTodo);
				setCounter(counter + 1);
			});
	};

	const handleKey = event => {
		if (event.key === "Enter" && inputValue !== " " && inputValue !== "") {
			addTodo(inputValue);
			setCounter(counter + 1);
			setInputValue("");
		}
	};

	const DeleteItems = key => {
		let newTodo = todo.filter((t, i) => i !== key);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/gabi", {
			method: "PUT",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(newTodo)
		})
			.then(response => response.json())
			.then(data => {
				setTodo(newTodo);
				setCounter(counter - 1);
			});
	};
	const deleteAll = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/gabi", {
			method: "DELETE",
			headers: {
				"Content-type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {
				setTodo([]);
				setCounter(0);
			});
	};

	return (
		<>
			<div className="container-fluid ">
				<div className="d-flex justify-content-center todo">todos</div>
				<div className="TodoList">
					<input
						onChange={e => setInputValue(e.target.value)}
						onKeyPressCapture={e => handleKey(e)}
						type="text"
						size="72"
						value={inputValue}
						placeholder="What need to be done?"
					/>

					<div>
						<ul>
							{todo.length > 0 &&
								todo.map((t, key) => (
									<li key={key} className="list-group-item index">
										{t.label}
										<button className="btn DelItem" onClick={() => DeleteItems(key)}>
											<i className="fas fa-times" />
										</button>
									</li>
								))}
							<li className="list-group-item">
								{"" + (counter === 0 ? "No tasks, add a task" : counter + " items left")}
							</li>
						</ul>
					</div>
					<div onClick={() => deleteAll()}>{counter === 0 ? <NothingToDel /> : <DeleteAllBut />} </div>
				</div>
			</div>
		</>
	);
}
