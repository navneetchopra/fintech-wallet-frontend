import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [profile, setProfile] = useState({});
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const profileResponse = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(profileResponse.data.user);

      const transactionResponse = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(transactionResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMoney = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/send-money",
        {
          receiver_id: Number(receiverId),
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Money Sent Successfully");

      fetchData();

      setReceiverId("");
      setAmount("");
    } catch (error) {
      console.log(error);

      alert("Money Transfer Failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Name: {profile.name}</h3>

      <h3>Email: {profile.email}</h3>

      <h3>Balance: {profile.balance}</h3>

      <br />

      <input
        type="number"
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSendMoney}>
        Send Money
      </button>

      <br />
      <br />

      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No Transactions Found</p>
      ) : (
        transactions.map((transaction, index) => (
          <div key={index}>
            <p>
              {transaction.sender_name} →{" "}
              {transaction.receiver_name} : ₹
              {transaction.amount}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;