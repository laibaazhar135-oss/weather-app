import { useState } from "react";

function App(){
    const [city,setCity] = useState('');
    const [weather,setWeather]= useState(null);
    const [loading,setLoading]= useState(false);
    const [error,setError]= useState('');
      
    const handleSearch = async(e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
       
        try{
            const responce = await fetch('https://weather-app-production-edd6.up.railway.app/api/weather',{
                method:'POST',
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({city: city})
            }
            )
            const data = await responce.json();
            if(responce.ok){
                setWeather(data);
                setCity('');
            }
            else{
                setError(data.error||'Something went wrong');
                setCity('');
                setWeather(null);
            }
        }
        catch(error){
            console.log('API fetch failed:',error);
            setError('Some server issue occured');
            setWeather(null);
        }
        finally{
            setLoading(false);
        }
    }
    return(
            <div className="min-h-screen bg-linear-to-br from-blue-500 to-purple-600 flex justify-center items-center p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                        <h1 className="text-center font-bold text-3xl mb-8">Pakistan Weather App</h1>
                        <form onSubmit={handleSearch} className="flex gap-3 mb-4">
                            <input type="text" 
                            placeholder="Enter city name...(e.g.Lahore)"
                            value={city}
                            onChange={(e)=>setCity(e.target.value)}
                            disabled={loading}
                            className="flex-1 border-2 border-gray-400 rounded-lg px-4 py-2 focus: outline-none focus:border-blue-500 transition-colors 
                            disabled:bg-gray-300 disabled:cursor-not-allowed"
                            />
                            <button className="bg-blue-500 rounded-lg hover:bg-blue-600 text-center px-4 py-2 transition-colors disabled:{loading} disabled:bg-gray-300 disabled:cursor-not-allowed">{loading? 'searching...':'Search'}</button>
                        </form>
                        {error&& (
                            <div className="border-red-500 bg-red-300 text-red-500 text-center rounded-lg shadow-2xl px-4 py-2">{error}</div>
                        )}

                        {weather&&(
                                <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col mb-2">
                                       <h1 className="text-center text-2xl text-white font-semibold">{weather.city}</h1>
                                       <p className="text-white font-semibold text-center text-6xl">{weather.temperature}C</p>
                                       <p className="text-center text-white text-lg font-semibold">{weather.condition}</p>
                                       <div className="flex justify-around p-4">
                                    <div className="text-white flex flex-col text-lg">
                                        <span>Humidity</span>
                                        <span>{weather.humidity}</span>
                                    </div>
                                    <div className=" flex flex-col text-white text-lg">
                                        <span>wind Speed</span>
                                        <span>{weather.speed}</span>
                                    </div>
                                </div>
                                </div>
                        )}

                        {loading&& (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin">
                                    <div className="h-12 w-12 border-4 border-blue-500 border-b-purple-600 rounded-full"></div>
                                </div>
                                <p className="text-gray-400 mt-3">loading...</p>
                            </div>
                         )}

                           {!weather && !error&& !loading &&(
                            <p className="text-gray-500 text-center text-lg">Search for a city to see weather!</p>
                        )}   
                    </div>
            </div>
    );
}
export default App;