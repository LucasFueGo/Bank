import React, { useState, useContext, useEffect } from 'react';
import { DateContext } from '@/context/DateContext';
import Layout from '@/components/Layout/Layout';
import CategoryChart from '@/components/Transaction/CategoryChart';
import GlobaleStats from '@/components/Transaction/GlobaleStats';
import { statsService } from '@/controller/statsService';

const Stats = () => {
    const { month, setMonth, year, setYear, months, years, viewMode, setViewMode } = useContext(DateContext);  

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Statistiques</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <GlobaleStats />
                <CategoryChart />
            </div>
        </Layout>
    );
};

export default Stats;