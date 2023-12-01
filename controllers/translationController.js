const baseURL = 'https://api-free.deepl.com/v2/translate';
const document= 'https://api-free.deepl.com/v2/document';
import ErrorStatus from '../utils/errorStatus.js'
import { readFile, unlink } from "node:fs/promises"

const translateText = async (req, res, next) => {
    // console.log('hi');
    const {text, target_lang} = req.body;
        try {
            const response = await fetch(baseURL, {
                            body: JSON.stringify( {
                                text,
                                target_lang,                
                            }),
                            method: "POST",
                            headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
                                }, 
                        });
            const data = await response.json()
            console.log(data)
                return res.status(200).json(data)
              } catch (error) {
                    console.error('Error translating text:', error);
                    throw error;
              }
            };

const allLanguages = (req, res) => res.json(req.languages);


        // file: {
        //     fieldname: 'translateDocument',
        //     originalname: 'test.txt',
        //     encoding: '7bit',
        //     mimetype: 'text/plain',
        //     destination: './uploads',
        //     filename: 'translateDocument-1701197609145.txt',
        //     path: 'uploads\\translateDocument-1701197609145.txt',
        //     size: 142
        //   },

const translateDocument = async (req, res, next) => {
  try {
    const languageCodes = req.languages.map(({language}) => language)

    if (!req.body.target_lang) throw new ErrorStatus('Please select target language', 400)
    if (!languageCodes.includes(req.body.target_lang)) throw new ErrorStatus('Invalid language', 400)

    const formData = new FormData();
    
    const fileData = await readFile(`./uploads/${req.file.filename}`)
    const docToTranslate = new Blob([fileData], {type: req.file.mimetype});

    formData.set("file", docToTranslate, req.file.filename)
    formData.append("target_lang", req.body.target_lang)

    const sendDocument = await fetch(document, {
      body: formData,
      method: "POST",
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
      }, 
    });

    const {document_id, document_key} = await sendDocument.json()

    console.log('document id and key', document_id, document_key)


    const statusPing = setInterval(async () => {
      try {
        const checkDocStatus = await fetch(`${document}/${document_id}`, {
          body: JSON.stringify({"document_key": document_key}),
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
          }, 
        });
    
        const data = await checkDocStatus.json()

        if (data.status === 'error') {
          clearInterval(statusPing)
          console.log(`DeepL Translation error: ${data.message}`)
          throw new ErrorStatus(data.message, 400)
        }
        
        if (data.status === 'done') {
          const downloadDoc = await fetch(`${document}/${document_id}/result`, {
            body: JSON.stringify({"document_key": document_key}),
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`, 
            }, 
          });
    
          const contentType = downloadDoc.headers.get("content-type")

          console.log(contentType)
    
          if (contentType === 'text/plain') {
            const translatedDoc = await downloadDoc.text();
            console.log("AFTER RETURN - DEEPL RESPONSE BODY: ", downloadDoc.body)
            console.log(translatedDoc)
            await unlink(req.file.path) 
            res.status(201).json({translation: translatedDoc})
            return clearInterval(statusPing)
          }

          console.log("AFTER RETURN - URL LIST: ", downloadDoc.urlList)
          console.log("AFTER RETURN - DEEPL RESPONSE BODY: ", downloadDoc.body)
          res.status(201).json({message: "translated document successfully"})
          await unlink(req.file.path)  
          return clearInterval(statusPing)
    
          // if (contentType.startsWith('application/json')) {
          //   const translatedDoc = await downloadDoc.json();
          //   console.log(translatedDoc)
          //   return res.status(201).json(translatedDoc)
          // }
    
          throw new Error('Content type is ' + contentType + ', need to setup another conditional')
        }
      } catch (error) {
        next(error)
      }
    }, 3000)
  } catch (error) {
    next(error)
  }
};        

export { translateText, allLanguages, translateDocument };