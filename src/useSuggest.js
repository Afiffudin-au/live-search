import { useState } from 'react'

const useSuggest = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [keywords, setKeywords] = useState([])
  const getSuggest = (controller, query, userText) => {
    //jika user menghapus query dikolom pencarian sampai habis, keyword akan direset. Bisa juga untuk erorr handling jika kolom pencarian kosong.
    if (userText === '') {
      setKeywords([])
      return
    }
    //jika keyword length di atas 0 alias ada isinya, akan dihapus dulu. Jika tidak dihapus akan direplace, kalau direplace performa program akan turun.
    if (keywords.length > 0) {
      //reset keywords
      setKeywords([])
    }
    setIsLoading(true)
    fetch(
      `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.REACT_APP_API_KEY}&query=${query}`,
      {
        signal: controller.signal,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setIsLoading(false)
        const array = data.results.map((item) => item.name)
        const unique = [...new Set(array)]
        setKeywords(unique)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error('Error', err)
      })
  }
  return {
    isLoading,
    keywords,
    getSuggest,
  }
}
export default useSuggest
