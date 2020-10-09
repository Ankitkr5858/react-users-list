import React, {useEffect, useState} from 'react';
import "./UserList.css"

const UserList = () => {
    const [users,setUsers]=useState([]);
    const [usersItems,setUsersItems]=useState([]);
    const [search,setSearch]=useState("");

    useEffect(()=>{
        let items=[];
        users && users.map(function (item,index) {
            if(item.first_name.toLowerCase().search(search.toLowerCase())>=0 || item.last_name.toLowerCase().search(search.toLowerCase())>=0  ){
                return items.push(item);
            }
        });

       setUsers(items);
    },[search]);

    useEffect(()=>{
        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data.data);
                setUsersItems(data.data);
            });

    },[]);

    const doSearch=(e)=>{
        if(e.target.value==""){
            setUsers(usersItems);
        }
        setSearch(e.target.value);
    };
    return (
            <section>
                <div className={"input"}>
                    <input placeholder={"Search user"} type={"text"} onChange={(e)=>{doSearch(e)}}/>
                </div>
                <div className="table-responsive">
                    <table className="table--hover">
                        <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>

                        {users && users.map(function (item,index) {
                            return (<tr key={index}>
                                <td data-label="Avatar"><img alt={""} src={item.avatar}/></td>
                                <td data-label="First Name">{item.first_name}</td>
                                <td data-label="Last Name">{item.last_name}</td>
                                <td data-label="Email">{item.email}</td>
                            </tr>)
                        })}

                        </tbody>
                    </table>
                </div>
            </section>

    );
};

export default UserList;
