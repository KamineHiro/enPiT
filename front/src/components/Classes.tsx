import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../img/logo.png'
import './styles.css'; 

interface Class {
    id: number;
    name: string;
}

function Classes() {
    const [classes, setClasses] = useState<Class[]>([]);
    const navigate = useNavigate();

    const fetchClasses = () => {
        const token = localStorage.getItem('token'); 
        axios.get('http://localhost:5001/classes', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response: AxiosResponse<Class[]>) => setClasses(response.data))
        .catch((error: Error) => console.error('Error:', error));
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleClassClick = (classId: number) => {
        navigate(`/assignments/${classId}`);
    };

    const addClass = () => {
        const className = prompt('授業名を登録してください。');
        if (className) {
            const token = localStorage.getItem('token'); 
            axios.post('http://localhost:5001/classes', { name: className }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response: AxiosResponse<Class>) => {
                setClasses([...classes, response.data]);
            })
            .catch((error: Error) => console.error('Error adding class:', error));
        }
    };

    const deleteClass = (classId: number) => {
        const confirmDelete = window.confirm("この授業を削除しますか？");
        if (!confirmDelete) {
            return; // キャンセルした場合は削除処理を実行しない
        }
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:5001/classes/${classId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            setClasses(classes.filter(c => c.id !== classId));
        })
        .catch((error: Error) => console.error('Error deleting class:', error));
    };

    return (
        <div className="container">
            <img src={LogoImage} alt="Logo" />
            <h2>授業を選択する</h2>
            {classes.length > 0 ? (
                classes.map(c => (
                    <div className="input-container" key={c.id}>
                        <div className="input-box" onClick={() => handleClassClick(c.id)} style={{ cursor: 'pointer' }}>
                            {c.name} 
                        </div>
                        <button className="close-btn" onClick={() => deleteClass(c.id)}>✕</button>
                    </div>
                ))
            ) : (
                <p>登録されている授業がありません。授業を登録してください。</p>
            )}
            <button onClick={addClass}>授業登録</button> 
        </div>
    );
}

export default Classes;
