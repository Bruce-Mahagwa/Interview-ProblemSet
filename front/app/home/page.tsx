"use client"
import axios from "axios"
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:4000";

export default function Home() {
    const [data, setData] = useState([])
    const [info, setInfo] = useState("");
    const [alerts, setAlerts] = useState("");

    async function fetchRecentTelemetry() {
        const res = await axios.get("/telemetry")
        return res;
    }
    useEffect(() => {
        const fetchFile = async () => {
            const res = await fetchRecentTelemetry();
            setData(res.data);
            setInfo(res.data.info[0])
            setAlerts(res.data.alerts)      
        }
        fetchFile();
    }, [])
    
    const [keys, setKeys] = useState(["temperature", "flow_rate", "power", "current"])
        
    return (
        <div className="p-4">
            <h1 className="text-center">Display Telemetry</h1>
            <div>
                <p>Temperature: {info.temperature}</p>
                <p>Humidity: {info.humidity}</p>
                <p>Flow_rate: {info.flow_rate}</p>
                <p>Power: {info.cumulative_power}</p>
                <p>Current: {info.current}</p>

            </div>

            <div className="mt-[20px]">
                {
                    keys.map((item, idx) => {
                        const message = alerts[item as keyof typeof alerts]
                        if (message) {
                            return (
                                <div key = {item} className = "flex gap-[30px]">
                                    <p>{message}</p>
                                    <button onClick={() => {
                                        setKeys(() => {
                                            return [...keys.slice(0, idx), ...keys.slice(idx + 1)]
                                        })
                                    }} className = "bg-black w-[100px] text-white">Remove</button>
                                </div>
                            )
                        }
                        return
                    })
                }
            </div>
        </div>
    );
}

