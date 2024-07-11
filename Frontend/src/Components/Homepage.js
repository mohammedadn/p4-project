function Home() {
    return (
        <div>
            <h1 className="text-center bg-secondary text-light fw-bold">WELCOME TO FITNESS TRACKER.</h1>
            <img src={"https://i.pinimg.com/originals/68/30/b4/6830b433283f0170c56259a2042f795e.jpg"} style={{ width: "1790px", height: "900px", objectFit: "cover" }} alt="" />
            <div className="row bg-secondary m-3" >
                <div className="col-md-4">
                    <header> <h3 id="call">Call Us</h3> </header>
                    <a className="text-white" href="0705237806"> <span>0705237806</span> </a>
                </div>
                <div className="col-md-4 text-right" > <header> <h3>Business Hours</h3> </header>
                    <h5 id="num">Monday-Friday: 8:30am to 5:30pm</h5>
                    <h5 id="num">Saturday: 9:00am to 5:00pm</h5>
                    <h5 id="num">Sorry We are Closed On Sunday</h5>
                </div>
                <div className="col-md-4">
                    <header> <h3 >Email Us</h3> </header>
                    <a href="khalifandkairo@gmail.com" className="text-white"> <span>khalifandkairo@gmail.com</span> </a>
                </div>
            </div>
        </div>
    )
}

export default Home;