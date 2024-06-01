"use client"

import React, { useEffect, useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    MapControl,
    ControlPosition,
} from "@vis.gl/react-google-maps";
import {
    schule,
    Schulsozialarbeit,
    Jugendberufshilfe,
    Kindertageseinrichtungen,
} from "../api/apiConfig";


interface Feature {
    geometry: { y: number; x: number }; 
    attributes: { [key: string]: any };
}

const App: React.FC = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [api, setApi] = useState<string>(Jugendberufshilfe);
    const [info, setInfo] = useState<{ [key: string]: any }>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(api);
                const data = await response.json();
                console.log(data);
                setFeatures(data.features);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [api]);

    const showInfoOnClick = (obj: { [key: string]: any }) => {
        console.log(obj);
        setInfo(obj);
        setIsModalOpen(true);
    };

    const handleApiTrigger = (requestedAPI: string) => {
        setApi(requestedAPI);
    };

    return (
        <APIProvider apiKey="AIzaSyBVXnBh_mZfwQDtubQkMtLOZJvw4GM5fnc">
            <Map
                style={{ width: "100vw", height: "100vh" }}
                defaultCenter={{ lat: 50.827847, lng: 12.92137 }}
                defaultZoom={12}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                mapId="bd61128fe6c5f1e5"
            >
                <MapControl position={ControlPosition.TOP_CENTER}>
                    <div className="flex p-2 justify-between space-x-4">
                        <button className="btn shadow-md" onClick={() => handleApiTrigger(schule)}>schule</button>
                        <button className="btn shadow-md" onClick={() => handleApiTrigger(Schulsozialarbeit)}>Schulsozialarbeit</button>
                        <button className="btn shadow-md" onClick={() => handleApiTrigger(Kindertageseinrichtungen)}>Kindertageseinrichtungen</button>
                        <button className="btn shadow-md" onClick={() => handleApiTrigger(Jugendberufshilfe)}>Jugendberufshilfe</button>
                    </div>
                </MapControl>
                {features.map((feature) => (
                    <AdvancedMarker
                        key={feature.attributes.OBJECTID}
                        position={{
                            lat: feature.geometry.y,
                            lng: feature.geometry.x,
                        }}
                        onClick={() => showInfoOnClick(feature.attributes)}
                    ></AdvancedMarker>
                ))}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg">
                            <h2>Attributes:</h2>
                            {Object.entries(info).map(([key, value]) => (
                                <p key={key}>
                                    <strong>{key}:</strong> {value}
                                </p>
                            ))}
                            <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                )}
            </Map>
        </APIProvider>
    );
};

export default App;
