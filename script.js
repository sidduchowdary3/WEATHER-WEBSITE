const getDataOfUser = () => {
    return new Promise((resolve, reject) => {
      let user = {
        longitude: null,
        latitude: null,
      };
  
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            user.latitude = position.coords.latitude;
            user.longitude = position.coords.longitude;
            resolve(user);
          },
          (error) => {
            window.alert('Enable Location');
            reject(null);
          }
        );
      } else {
        window.alert('Location Not Available');
        reject(null);
      }
    });
  };
  
  const getWeatherData = async () => {
    try {
      let userData = await getDataOfUser();
      console.log(userData);
      try{
        let fetchedData = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&start_date=2024-08-24&end_date=2024-08-26')
        let data = await fetchedData.json();
        console.log(data);
        let dataOfForecast = data.hourly;
        console.log(dataOfForecast);
        let temperature = dataOfForecast.temperature_2m;
        
        let dates= dataOfForecast.time;
        let DataofDates= dates.map(date=>{
          return {
            thisTime:date.split('T')[1],
            thisDate:date.split('T')[0]
          }
        })
        let userDataForecast = DataofDates.map((date,index)=>{
          return{
            date,
            temperature:temperature[index]
          }
        });
        console.log(userDataForecast);
  
        let dataDiv = document.getElementById('DataDiv');
        userDataForecast.forEach((forecast)=>{
          let div = document.createElement('div');
          div.innerHTML = `
          <p>Date: ${forecast.date.thisDate} -  ${forecast.date.thisTime} </p>
          <p>Temperature: ${forecast.temperature}</p>
          `;
          dataDiv.appendChild(div);
        })
        
      }catch(err){
        console.log('ERROR');
      }
  
      
      
      
    } catch (error) {
      console.log('Error getting user location:', error);
    }
  };
  
  getWeatherData();
  
  const onMyClick =()=>{
    let Name = 'Siddu';
  
    let dataDiv = document.querySelector('#DataDiv');
    let div = document.createElement('div');
    div.innerHTML = "<p>"+Name+"</p>";
    dataDiv.appendChild(div);
    
  }
  
  