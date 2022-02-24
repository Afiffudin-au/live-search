import React, { useEffect, useState } from 'react'
import useSuggest from '../useSuggest'
import styles from './AutoSuggest.module.css'
function AutoSuggest() {
  const [searchQuery, setSearchQuery] = useState('')
  const { getSuggest, isLoading, keywords } = useSuggest()
  //HandleSearch digunakan jika user tidak mau menggunakan saran.
  const handleSearch = (e) => {
    e.preventDefault()
    //pendeteksi jika ada space kosong di kolom pencarian
    const userText = searchQuery.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      return
    }
    console.log(searchQuery)
  }
  //useEffect, jika state searchQuery berubah, useEffect akan dijalankan untuk mendapatkan saran dari API TMDB
  useEffect(() => {
    const userText = searchQuery?.replace(/^\s+/, '').replace(/\s+$/, '')
    let controller = new AbortController()
    //Fetch API
    getSuggest(controller, searchQuery, userText)
    return () => {
      controller.abort()
    }
  }, [searchQuery])
  return (
    <div className={styles.autoSuggest}>
      <form action='' className={styles.form}>
        <input
          placeholder='type to search'
          className={styles.input}
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.btnSearch} onClick={handleSearch}>
          Search
        </button>
      </form>
      {isLoading && <p>loading...</p>}
      {keywords?.length > 0 && (
        <article className={styles.suggest}>
          {/* slice(0,10) artinya membatasi loop sampai 10 */}
          {keywords?.slice(0, 10).map((item) => (
            <p key={item} className={styles.suggestItem}>
              {item}
            </p>
          ))}
        </article>
      )}
    </div>
  )
}
export default AutoSuggest
