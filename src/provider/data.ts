export default const dictionary = async () => {
    const url = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${searchTerm}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5811369c61msh422c3eb262c22c4p1943b9jsne7dc9874dd46',
        'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };