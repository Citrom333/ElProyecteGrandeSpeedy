import React from "react";
import Navbar from "../Components/Navbar"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderForm from "../Components/FormForOrderAddOrUpdate";

export default function OrdersUpdatePage() {
    const id = useParams().id
    console.log(id)
    const [data, setData] = useState([]);
    // const [data, setOrder] = useState("");
    const [message, setMessage] = useState("");
    const [company, setCompany] = useState("");
    const [loadingPlace, setLoadingPlace] = useState("");
    const [unloadingPlace, setUnloadingPlace] = useState("");
    const [driver, setDriver] = useState("");
    const [goods, setGoods] = useState("");

    function fetchData() {
        fetch(`/api/Orders/${id}`)
            .then((response) => response.json())
            .then((json) => setData(json)).catch(e => console.log(e.message));;
    }
    useEffect(() => {
        fetchData();
        console.log(data);
    }, [data.length]);
    // useEffect(() => {
    //     setOrder(data)
    //     console.log(data)
    // }, [data.id]);

    const [companyData, setCompanyData] = useState([]);
    const [driverData, setDriverData] = useState([]);
    const [goodsData, setGoodsData] = useState([]);

    function fetchCompanies() {
        fetch("/api/Companies")
            .then((response) => response.json())
            .then((json) => setCompanyData(json)).catch(e => console.log(e.message));;
    }
    function fetchDrivers() {
        fetch("/api/users/driver")
            .then((response) => response.json())
            .then((json) => setDriverData(json)).catch(e => console.log(e.message));;
    }
    function fetchGoods() {
        fetch("/api/Goods")
            .then((response) => response.json())
            .then((json) => setGoodsData(json)).catch(e => console.log(e.message));;
    }
    useEffect(() => {
        fetchCompanies();
        fetchDrivers();
        fetchGoods();
    }, []);
    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data)
        console.log("company " + company);
        console.log(loadingPlace);
        console.log(unloadingPlace)
        console.log("driver" + driver)
        console.log("goods: " + goods);
        let datas = {
            companyId: company === data.company ? "" : company,
            loadingAddress: loadingPlace === data.loqadingPlace ? "" : loadingPlace,
            unloadingAddress: unloadingPlace === data.unloadingPlace ? "" : unloadingPlace,
            driverId: driver === data.driver ? "" : driver,
            goodsId: goods === data.goods ? "" : goods,
        }
        let dataToFetch = {};
        let filteredDatas = Object.entries(datas).map(pair => pair[1] !== "" ? dataToFetch[pair[0]] = pair[1] : '')
        console.log(dataToFetch)
        try {
            let res = await fetch(`/api/Orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(dataToFetch),
            });
            // let resJson = await res.json();
            if (res.status === 200) {
                setCompany("");
                setLoadingPlace("");
                setUnloadingPlace("");
                setDriver("");
                setGoods("");
                setMessage("data created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Edit data ({id})</h1>
            {(companyData.length > 0 && driverData.length > 0 && goodsData.length > 0 && data.id !== undefined) ?
                <form className="form" onSubmit={handleSubmit}>
                    <div className="formElement">
                        <select defaultValue={data.company} name="company" onChange={(e) => setCompany(e.target.value)}>
                            <option value="" disabled selected hidden>select company</option>
                            {companyData.map(company => (<option key={`company${company.id}`} value={company.id} >{company.name}</option>))}
                        </select>
                    </div>
                    <div className="formElement">
                        <label>
                            Loading address:
                            <input type="text" value={data.loadingPlace} onChange={(e) => setLoadingPlace(e.target.value)} />
                        </label>
                    </div>
                    <div className="formElement">
                        <label>
                            Unloading address:
                            <input type="text" value={data.unloadingPlace} onChange={(e) => setUnloadingPlace(e.target.value)} />
                        </label>
                    </div>
                    <div className="formElement">
                        <select defaultValue={data.driver} name="Driver" onChange={(e) => setDriver(e.target.value)}>
                            <option value="" disabled selected hidden>select driver</option>
                            {driverData.map(driver => (<option key={`driver${driver.id}`} value={driver.id} >{driver.name}</option>))}
                        </select>
                    </div>
                    <div className="formElement">
                        <select value={data.goods} name="Goods" onChange={(e) => setGoods(e.target.value)}>
                            <option value="" disabled selected hidden>select goods</option>
                            {goodsData.map(goods => (<option key={`goods${goods.id}`} value={goods.id} >{goods.name}</option>))}
                        </select>
                        <button >Add new goods</button>
                    </div>
                    <input type="submit" value="Submit" />

                </form>
                : <h1>Loading...</h1>}
            {message === "" ? "" : <p>{message}</p>}
        </div>
    );
}