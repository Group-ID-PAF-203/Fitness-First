import React, { useEffect, useState } from "react";
import "../Styles/home.css";
import { Link } from "react-router-dom";
import AuthModal from "../Components/Auth/AuthModal";
import { useSnapshot } from "valtio";
import state from "../Utils/Store";
import UserService from "../Services/UserService";
const Home = () => {
  const snap = useSnapshot(state);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      UserService.getProfile().then((userDataMain) => {
        state.currentUser = userDataMain;
        console.log(userDataMain);
      });
    }
  }, []);
  return (
    <body className="home-body">
      <AuthModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
      <nav className="nav-home">
        <div class="nav__logo">
          <Link to="#">
            <img src="assets/logo2.png" alt="logo" />
          </Link>
        </div>
        <ul class="nav__links">
          <li class="link">
            <Link to="#">Home</Link>
          </li>
          <li class="link">
            <Link to="#">Program</Link>
          </li>
          <li class="link">
            <Link to="#">Service</Link>
          </li>
          <li class="link">
            <Link to="#">About</Link>
          </li>
          <li class="link">
            <Link to="/community">Community</Link>
          </li>
        </ul>
        {!snap.currentUser && (
          <button
            class="btn"
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            Join Now
          </button>
        )}
      </nav>

      <header class="section__container header__container">
        <div class="header__content">
          <span class="bg__blur"></span>
          <span class="bg__blur header__blur"></span>
          <h4>BEST FITNESS IN THE TOWN</h4>
          <h1>
            <span>Build</span> YOUR BODY Muscles
          </h1>
          <p>
            Unleash your potential and embark on a journey towards a stronger,
            fitter, and more confident you. Sign up for 'Make Your Body Shape'
            now and witness the incredible transformation your body is capable
            of!
          </p>
          {!snap.currentUser && <button class="btn">Get Started</button>}
        </div>
        <div class="header__image">
          <img src="assets/header2.png" alt="header" />
        </div>
      </header>

      <section class="section__container explore__container">
        <div class="explore__header">
          <h2 class="section__header">EXPLORE OUR PROGRAM</h2>
          <div class="explore__nav">
            <span>
              <i class="ri-arrow-left-line"></i>
            </span>
            <span>
              <i class="ri-arrow-right-line"></i>
            </span>
          </div>
        </div>
        <div class="explore__grid">
          <div class="explore__card">
            <span>
              <i class="ri-boxing-fill"></i>
            </span>
            <h4>Strength</h4>
            <p>
              Embrace the essence of strength as we delve into its various
              dimensions physical, mental, and emotional.
            </p>
            <Link to="#">
              Join Now <i class="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div class="explore__card">
            <span>
              <i class="ri-heart-pulse-fill"></i>
            </span>
            <h4>Physical Fitness</h4>
            <p>
              It encompasses a range of activities that improve health,
              strength, flexibility, and overall well-being.
            </p>
            <Link to="#">
              Join Now <i class="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div class="explore__card">
            <span>
              <i class="ri-run-line"></i>
            </span>
            <h4>Fat Lose</h4>
            <p>
              Through a combination of workout routines and expert guidance,
              we'll empower you to reach your goals.
            </p>
            <Link to="#">
              Join Now <i class="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div class="explore__card">
            <span>
              <i class="ri-shopping-basket-fill"></i>
            </span>
            <h4>Weight Gain</h4>
            <p>
              Designed for individuals, our program offers an effective approach
              to gaining weight in a sustainable manner.
            </p>
            <Link to="#">
              Join Now <i class="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      <section class="section__container class__container">
        <div class="class__image">
          <span class="bg__blur"></span>
          <img src="assets/class-1.jpg" alt="class" class="class__img-1" />
          <img src="assets/class-2.jpg" alt="class" class="class__img-2" />
        </div>
        <div class="class__content">
          <h2 class="section__header">THE CLASS YOU WILL GET HERE</h2>
          <p>
            Led by our team of expert and motivational instructors, "The Class
            You Will Get Here" is a high-energy, results-driven session that
            combines a perfect blend of cardio, strength training, and
            functional exercises. Each class is carefully curated to keep you
            engaged and challenged, ensuring you never hit a plateau in your
            fitness endeavors.
          </p>
          <button class="btn">Book A Class</button>
        </div>
      </section>

      <section class="section__container join__container">
        <h2 class="section__header">WHY JOIN US ?</h2>
        <p class="section__subheader">
          Our diverse membership base creates a friendly and supportive
          atmosphere, where you can make friends and stay motivated.
        </p>
        <div class="join__image">
          <img src="assets/join.jpg" alt="Join" />
          <div class="join__grid">
            <div class="join__card">
              <span>
                <i class="ri-user-star-fill"></i>
              </span>
              <div class="join__card__content">
                <h4>Personal Trainer</h4>
                <p>Unlock your potential with our expert Personal Trainers.</p>
              </div>
            </div>
            <div class="join__card">
              <span>
                <i class="ri-vidicon-fill"></i>
              </span>
              <div class="join__card__content">
                <h4>Practice Sessions</h4>
                <p>Elevate your fitness with practice sessions.</p>
              </div>
            </div>
            <div class="join__card">
              <span>
                <i class="ri-building-line"></i>
              </span>
              <div class="join__card__content">
                <h4>Good Management</h4>
                <p>Supportive management, for your fitness success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section__container price__container">
        <h2 class="section__header">OUR PRICING PLAN</h2>
        <p class="section__subheader">
          Our pricing plan comes with various membership tiers, each tailored to
          cater to different preferences and fitness aspirations.
        </p>
        <div class="price__grid">
          <div class="price__card">
            <div class="price__card__content">
              <h4>Basic Plan</h4>
              <h3>Rs.2500/=</h3>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                Smart workout plan
              </p>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                At home workouts
              </p>
            </div>
            <button class="btn price__btn">Join Now</button>
          </div>
          <div class="price__card">
            <div class="price__card__content">
              <h4>Weekly Plan</h4>
              <h3>Rs.6000/=</h3>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                PRO Gyms
              </p>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                Smart workout plan
              </p>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                At home workouts
              </p>
            </div>
            <button class="btn price__btn">Join Now</button>
          </div>
          <div class="price__card">
            <div class="price__card__content">
              <h4>Monthly Plan</h4>
              <h3>Rs.10000/=</h3>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                ELITE Gyms & Classes
              </p>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                PRO Gyms
              </p>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                Smart workout plan
              </p>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                At home workouts
              </p>
              <p>
                <i class="ri-checkbox-circle-line"></i>
                Personal Training
              </p>
            </div>
            <button class="btn price__btn">Join Now</button>
          </div>
        </div>
      </section>

      <section class="review">
        <div class="section__container review__container">
          <span>
            <i class="ri-double-quotes-r"></i>
          </span>
          <div class="review__content">
            <h4>MEMBER REVIEW</h4>
            <p>
              What truly sets this gym apart is their expert team of trainers.
              The trainers are knowledgeable, approachable, and genuinely
              invested in helping members achieve their fitness goals. They take
              the time to understand individual needs and create personalized
              workout plans, ensuring maximum results and safety.
            </p>
            <div class="review__rating">
              <span>
                <i class="ri-star-fill"></i>
              </span>
              <span>
                <i class="ri-star-fill"></i>
              </span>
              <span>
                <i class="ri-star-fill"></i>
              </span>
              <span>
                <i class="ri-star-fill"></i>
              </span>
              <span>
                <i class="ri-star-half-fill"></i>
              </span>
            </div>
            <div class="review__footer">
              <div class="review__member">
                <img src="assets/member.jpg" alt="member" />
                <div class="review__member__details">
                  <h4>Kaveesh Heshan</h4>
                  <p></p>
                </div>
              </div>
              <div class="review__nav">
                <span>
                  <i class="ri-arrow-left-line"></i>
                </span>
                <span>
                  <i class="ri-arrow-right-line"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      <footer class="section__container footer__container">
        <span class="bg__blur"></span>
        <span class="bg__blur footer__blur"></span>
        <div class="footer__col">
          <div class="footer__logo">
            <img src="assets/logo.png" alt="logo" />
          </div>
          <p>
            Take the first step towards a healthier, stronger you with our
            unbeatable pricing plans. Let's sweat, achieve, and conquer
            together!
          </p>
          <div class="footer__socials">
            <Link to="#">
              <i class="ri-facebook-fill"></i>
            </Link>
            <Link to="#">
              <i class="ri-instagram-line"></i>
            </Link>
            <Link to="#">
              <i class="ri-twitter-fill"></i>
            </Link>
          </div>
        </div>
        <div class="footer__col">
          <h4>Company</h4>
          <Link to="#">Business</Link>
          <Link to="#">Franchise</Link>
          <Link to="#">Partnership</Link>
          <Link to="#">Network</Link>
        </div>
        <div class="footer__col">
          <h4>About Us</h4>
          <Link to="#">Blogs</Link>
          <Link to="#">Security</Link>
          <Link to="#">Careers</Link>
        </div>
        <div class="footer__col">
          <h4>Contact</h4>
          <Link to="#">Contact Us</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms & Conditions</Link>
          <Link to="#">BMI Calculator</Link>
        </div>
      </footer>
      <div class="footer__bar">
        Copyright © 2024 Web Design Mastery. All rights reserved.
      </div>
    </body>
  );
};

export default Home;
