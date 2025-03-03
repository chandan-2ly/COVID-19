import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {

    let changableCountryUrl = url;

    if(country){
        changableCountryUrl = `${url}/countries/${country}`;
    }

    try {

        const {data} = await axios.get(changableCountryUrl);

        const modifiedData = {
            confirmed: data.confirmed,
            deaths: data.deaths,
            recovered: data.recovered,
            lastUpdate: data.lastUpdate
        };

        return modifiedData;

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async() => {
    try {
        
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,

        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async() => {
    
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}