const PakistanCities=[
     'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Gujranwala',
  'Sialkot',
  'Sargodha',
  'Bahawalpur',
  'Jhang',
  'Mardan',
  'Abbottabad',
  'Mirpur',
  'Chitral',
  'Kasur',
  'Okara'
];

function findCityinPakistan(cityName){
    return PakistanCities.some(city=>
        city.toLowerCase()===cityName.toLowerCase()
    )
};

module.exports= {PakistanCities,findCityinPakistan};