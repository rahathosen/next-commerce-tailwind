// import axios from "axios";
import Link from "next/link";
// import { Bar } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import React, { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
// import { getError } from "../../utils/error";

function AdminDashboardScreen() {
  return (
    <>
      <Layout title="Admin Dashboard">
        <div className="grid md:grid-cols-4 md:gap-5">
          <div>
            <ul>
              <li>
                <Link href="/admin/dashboard">
                  <a className="font-boald">Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/admin/orders">Orders</Link>
              </li>
              <li>
                <Link href="/admin/products">Products</Link>
              </li>
              <li>
                <Link href="/admin/users">Users</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h1 className="mb-4 text-xl">Admin Dashboard</h1>
          </div>
        </div>
      </Layout>
    </>
  );
}

AdminDashboardScreen.auth = { aminOnly: true };
export default AdminDashboardScreen;
