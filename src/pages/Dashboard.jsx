import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [addAmount, setAddAmount] = useState("");

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

  const handleAddMoney = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/add-money",
        {
          amount: Number(addAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      alert("Money Added Successfully");

      fetchData();

      setAddAmount("");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Money");
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
        },
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
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Name: {profile.name}</h3>

      <h3>Email: {profile.email}</h3>

      <h3>Balance: {profile.balance}</h3>

      <br />
      <h2>Add Money</h2>

      <input
        type="number"
        placeholder="Enter Amount"
        value={addAmount}
        onChange={(e) => setAddAmount(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAddMoney}>Add Money</button>

      <br />
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

      <button onClick={handleSendMoney}>Send Money</button>

      <br />
      <br />

      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No Transactions Found</p>
      ) : (
        transactions.map((transaction, index) => (
          <div key={index}>
            <p>
              {transaction.sender_name} → {transaction.receiver_name} : ₹
              {transaction.amount}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
