"use client"

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useEggs} from "@/components/EggProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PASSWORD = "greenhouseisthenewphantom"

export default function AdminPage() {
    const { foundEgg, hasFound } = useEggs();
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    const unlocked = hasFound("admin-access");

    function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
        if (input.trim().toLowerCase() === PASSWORD) {
            setError(false);
        } else {
            setError(true);
            foundEgg("admin-access")

        }
    }

    return (
        <main>
            <Navbar />
            <div style={{ padding: "120px 20px", textAlign: "centre", maxWidth: 480, margin:"0 auto"}}>
                <form onSubmit={handleSubmit}>
                    <p>Restricted access. Enter credentials.</p>
                    <input
                        type="password"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ border: "1px solid #ccc", padding: 8 }}
                    />

                    <button type="submit" style={{marginLeft: 8}}>
                        Submit
                    </button> 

                    {error && (
                        <p style={{ color: "red" }}>
                        Incorrect. Check <Link href="/philosophy">/philosophy</Link>... Something is different.
                        </p>
                    )}

                </form>
                </div>
                <Footer />
                </main>
    );


}
