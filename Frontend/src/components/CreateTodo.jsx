import { useState } from "react";


export function CreateTodo() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return <div>
        <input style={
            {
                padding: 10,
                margin: 10
            }
        } type="text" placeholder="Title" onChange={function (e) {
            const value = e.target.value;
            setTitle(value);
        }}></input><br />
        <input style={
            {
                padding: 10,
                margin: 10
            }
        } type="text" placeholder="Description" onChange={function (e) {
            const value = e.target.value;
            setDescription(value);
        }} ></input><br />
        <button style={
            {
                padding: 10,
                margin: 10
            }
        } onClick={() => {
            fetch("http://localhost:3001/todo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(
                    async function (res) {
                        const json = await res.json();
                        if (res.ok) {
                            alert("Todo Added");
                        } else {
                            alert("Error - TODO not added")
                        }
                    }
                )
        }}>Add TODO</button>
    </div>
}