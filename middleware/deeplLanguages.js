const deeplLanguages = async (req, res, next) => {
  try {
    const response = await fetch(
      'https://api-free.deepl.com/v2/languages?type=target',
      {
        headers: {
          'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
        }
      } 
    );

    const data = await response.json()
    
    req.languages = data

    next()
  } catch (error) {
    next(error)
  }
}

export default deeplLanguages