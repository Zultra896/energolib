import styles from '../css/persons.module.css'
import searchIcon from '../img/searchIcon2.svg';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Persons() {
  const navigate = useNavigate();

  const [persons, setPersons] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const fetchPersons = async () => {
    try {
        const response = await axios.get('http://localhost:5000/persons');
        setPersons(response.data);
    } catch (error) {
        console.error('Ошибка загрузки персон:', error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPersons = persons.filter(person => 
    (person.kz_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     person.ru_name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    fetchPersons();
  })
  return (
    <div className={styles.container}>
      <h1 className={styles.Title}>История писателей</h1>
      <label className={styles.searchLabel}>
        <img src={searchIcon} alt="" />
        <input
          className={styles.searchInput}
          type="text"
          name="title"
          placeholder="Поиск по имени"
          value={searchQuery}
          onChange={handleSearchChange}
          autocomplete="off"
        />
      </label>
      <div className={styles.gridPersons}>
        {filteredPersons.map((person) => (
            <div className={styles.itemPerson} key={person.id}>
                <div className={styles.photo}>
                    <img src={person.img_url} alt="" />
                </div>
                <div>
                    <h1 className={styles.namePerson}>{person.kz_name}</h1>
                    <h1 className={styles.namePerson}>{person.ru_name}</h1>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Persons;