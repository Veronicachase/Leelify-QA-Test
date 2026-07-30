import logo from "../../assets/logo/leelify-logo.png";
import home from "../../assets/icons/home.svg";
import auriculares from "../../assets/icons/headphones.svg";
import check from "../../assets/icons/check.svg";
import flame from "../../assets/icons/flame.svg";
import cup from "../../assets/icons/cup.svg";
import mascota from "../../assets/mascota/conejo-celebrando.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { menuVariants, itemVariants } from "../../animations/homeAnimations";

export const Nav = () => {
  return (
    <nav className="home-nav" aria-label="Navegacion principal">
      <motion.ul
        className="nav-items"
        variants={menuVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.li
          className="home-logo"
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <Link to="/home" aria-label="ir a inicio">
            <img src={logo} alt="logo leelify" />
          </Link>
        </motion.li>
        <motion.li
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <Link to="/home">
            <img
              src={home}
              alt="home"
              aria-hidden="true"
              aria-label="ir a inicio"
              className="home_nav_item_icon"
            />
          </Link>{" "}
          <span className="home_nav_item_text"> Home</span>
        </motion.li>
        <motion.li
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <Link to="#">
            <img
              src={auriculares}
              alt="audios"
              aria-hidden="true"
              aria-label="ir a inicio"
              className="home_nav_item_icon"
            />
          </Link>
          <span className="home_nav_item_text"> Audiolibros </span>
        </motion.li>
        <motion.li
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <Link to="/game/1">
            <img
              src={check}
              alt="retos"
              aria-hidden="true"
              aria-label="ir a juegos"
              className="home_nav_item_icon"
            />
          </Link>
          <span> Retos</span>
        </motion.li>
        <motion.li
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <img src={flame} alt="dias" className="home_nav_item_icon" />
          <span> Días</span>
        </motion.li>
        <motion.li
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <img
            src={cup}
            alt="puntos"
            aria-hidden="true"
            className="home_nav_item_icon"
          />
          <span> 0 pt </span>
        </motion.li>
        <motion.li
          className="home_item_perfil"
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <Link to="#" aria-label="ir a perfil">
            <img src={mascota} alt="perfil" />
          </Link>
        </motion.li>
      </motion.ul>
    </nav>
  );
};
