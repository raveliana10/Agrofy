import { useState, useEffect } from "react";
import CardLimbah from "../../components/Card/CardLimbah";

export default function LimbahList() {
  const [limbahList, setLimbahList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/limbah"); // Sesuaikan URL
        const result = await response.json();
        if (response.ok) {
          setLimbahList(result.data);
        } else {
          console.error(result.msg);
        }
      } catch (error) {
        console.error("Error fetching limbah data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {limbahList.map((limbah) => (
        <CardLimbah
          key={limbah.id}
          img={limbah.gambar || "/default-image.png"} // Default jika tidak ada gambar
          judul={limbah.nama_limbah}
          deskripsi={limbah.deskripsi}
        />
      ))}
    </div>
  );
}
