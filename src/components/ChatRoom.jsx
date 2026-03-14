import { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(
    () => localStorage.getItem("draftMessage") || ""
  );
  const [messages, setMessages] = useState([]);

  // Cek login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Simpan draft pesan ke localStorage
  useEffect(() => {
    localStorage.setItem("draftMessage", message);
  }, [message]);

  // Ambil pesan real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAtClient", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsub();
  }, []);

  // Kirim pesan
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    await addDoc(collection(db, "messages"), {
  text: message.trim(),
  uid: user.uid,
  displayName: user.displayName || "Anonymous",
  photoURL: user.photoURL || "",
  createdAt: serverTimestamp(),
  createdAtClient: Date.now(),
  });

    setMessage("");
    localStorage.removeItem("draftMessage");
  };

return (
  <div className="bg-gradient-to-br from-[#0c1019] via-[#0f1320] to-[#0b0f18] border border-emerald-400/20 p-6 rounded-[24px] shadow-[0_0_30px_rgba(16,185,129,0.10)] max-w-xl mx-auto mt-2 backdrop-blur-xl">
    <h2 className="text-3xl font-bold text-center mb-5 text-white drop-shadow-[0_0_10px_rgba(52,211,153,0.18)]">
      💬 Chat Room
    </h2>

    {user && (
      <div className="flex justify-between items-center mb-4 border-b border-emerald-400/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-[2px] rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_12px_rgba(52,211,153,0.35)]">
            <img
              src={
                user?.photoURL ||
                user?.providerData?.[0]?.photoURL ||
                "/portofolio/assets/default-avatar.png"
              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover bg-[#0f172a]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "/portofolio/assets/default-avatar.png";
              }}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-white font-semibold leading-tight">
              {user.displayName || "Anonymous"}
            </span>
            <span className="text-xs text-emerald-300/80">Online now</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-rose-500/90 px-4 py-1.5 rounded-full text-white hover:bg-rose-500 shadow-[0_0_16px_rgba(244,63,94,0.22)] transition-all duration-300"
        >
          Logout
        </button>
      </div>
    )}

    <div className="custom-scroll h-72 overflow-y-auto border border-emerald-400/15 p-4 rounded-2xl bg-white/[0.03] mb-4 space-y-3 shadow-inner">
      {messages
        .filter((msg) => msg.text)
        .map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 items-end ${
              msg.uid === user?.uid ? "justify-end" : "justify-start"
            }`}
          >
            {msg.uid !== user?.uid && (
              <img
                src={
                  msg.photoURL && msg.photoURL.trim() !== ""
                    ? msg.photoURL
                    : "/portofolio/assets/default-avatar.png"
                }
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border border-emerald-400/20"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "/portofolio/assets/default-avatar.png";
                }}
              />
            )}

            <div
              className={`p-3 rounded-2xl max-w-[75%] shadow-md ${
                msg.uid === user?.uid
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-md"
                  : "bg-zinc-700/80 text-white rounded-bl-md border border-white/5"
              }`}
            >
              <div className="text-xs opacity-70 mb-1">
                {msg.displayName || "Anonymous"}
              </div>
              <div className="leading-relaxed">{msg.text}</div>
            </div>

            {msg.uid === user?.uid && (
              <img
                src={
                  msg.photoURL && msg.photoURL.trim() !== ""
                    ? msg.photoURL
                    : "/portofolio/assets/default-avatar.png"
                }
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border border-cyan-400/20"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "/portofolio/assets/default-avatar.png";
                }}
              />
            )}
          </div>
        ))}
    </div>

    {user ? (
      <form
        onSubmit={sendMessage}
        className="flex gap-2 flex-wrap sm:flex-nowrap w-full"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 min-w-0 p-3 rounded-xl bg-white/[0.04] text-white border border-emerald-400/15 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/35 focus:border-emerald-400/35 transition-all duration-300"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 rounded-xl text-white hover:scale-[1.02] shadow-[0_0_18px_rgba(16,185,129,0.28)] hover:shadow-[0_0_28px_rgba(16,185,129,0.45)] transition-all duration-300 w-full sm:w-auto"
        >
          Send
        </button>
      </form>
    ) : (
      <div className="flex flex-col items-center justify-center gap-4 pt-1">
        <button
          onClick={loginWithGoogle}
          className="flex items-center gap-3 bg-white text-gray-800 px-6 py-3 rounded-full shadow hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02]"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Login with Google
        </button>
        <p className="text-sm text-zinc-400">Login untuk mengirim pesan</p>
      </div>
    )}
  </div>
);
}