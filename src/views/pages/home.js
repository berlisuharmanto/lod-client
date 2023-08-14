import React, { useEffect, useState } from 'react'
import Card from '../components/ItemCard';
import Layout from './Layout';
import { useAuthHeader } from 'react-auth-kit';
import { toast } from 'react-toastify';

export default function Home() {
  const [items, setItems] = useState([]);
  const authHeader = useAuthHeader();

  useEffect(() => {
      fetchItems();
  });

  const fetchItems = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/menu`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader()
          },
      }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            return response.json().then((data) => {
                throw new Error(data.message);
            });
        }
    })
      .then((data) => {
          setItems(data.data);
      })
      .catch((error) => {
          toast.error(error.message);
      });
  }

  return (
    <>
        <Layout>
            <div className="h-screen m-3">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row w-full">
                      {
                        items.length === 0 && <div className="flex flex-col w-full justify-center items-center font-bold">Tidak ada menu</div>
                      }
                      <div className="flex flex-col w-full justify-center items-center">
                        {
                          items && <Card items={items}/>
                        }
                      </div>
                    </div>
                </div>
            </div>
        </Layout>
    </>
  );
}
