import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useCategory() {
    const [categoryData, setCategory] = useState([])
    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/category/get');
            setCategory(res.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(()=>{
        getData();
    },[])
  return [categoryData]
}

export default useCategory