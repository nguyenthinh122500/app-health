/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Category` (
  `category_id` varchar(50) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `description` text,
  `image` text,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DailyPlanDetails` (
  `detail_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `plan_id` varchar(50) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `exercise_id` varchar(50) DEFAULT NULL,
  `meal_id` varchar(50) DEFAULT NULL,
  `day` int DEFAULT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `plan_id` (`plan_id`),
  KEY `exercise_id` (`exercise_id`),
  KEY `meal_id` (`meal_id`),
  CONSTRAINT `DailyPlanDetails_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `WorkoutPlans` (`plan_id`),
  CONSTRAINT `DailyPlanDetails_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `Exercises` (`exercise_id`),
  CONSTRAINT `DailyPlanDetails_ibfk_3` FOREIGN KEY (`meal_id`) REFERENCES `Meals` (`meal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Exercises` (
  `exercise_id` varchar(50) NOT NULL,
  `exercise_name` varchar(255) DEFAULT NULL,
  `description` text,
  `video_url` text,
  `image` text,
  PRIMARY KEY (`exercise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Meals` (
  `meal_id` varchar(50) NOT NULL,
  `meal_name` varchar(255) DEFAULT NULL,
  `description` text,
  `calories` float DEFAULT NULL,
  `image` text,
  PRIMARY KEY (`meal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PlanExercises` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `plan_id` varchar(50) DEFAULT NULL,
  `exercise_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `plan_id` (`plan_id`),
  KEY `exercise_id` (`exercise_id`),
  CONSTRAINT `PlanExercises_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `WorkoutPlans` (`plan_id`),
  CONSTRAINT `PlanExercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `Exercises` (`exercise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `PlanMeals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `plan_id` varchar(50) DEFAULT NULL,
  `meal_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `plan_id` (`plan_id`),
  KEY `meal_id` (`meal_id`),
  CONSTRAINT `PlanMeals_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `WorkoutPlans` (`plan_id`),
  CONSTRAINT `PlanMeals_ibfk_2` FOREIGN KEY (`meal_id`) REFERENCES `Meals` (`meal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `user_id` varchar(50) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `health_index` float DEFAULT NULL,
  `message` text,
  `image` text,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserSelectedPlans` (
  `selection_id` varchar(50) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `plan_id` varchar(50) DEFAULT NULL,
  `workout_date` date DEFAULT NULL,
  PRIMARY KEY (`selection_id`),
  KEY `user_id` (`user_id`),
  KEY `plan_id` (`plan_id`),
  CONSTRAINT `UserSelectedPlans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `UserSelectedPlans_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `WorkoutPlans` (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `WorkoutPlans` (
  `plan_id` varchar(50) NOT NULL,
  `goal` text,
  `fitness_level` text,
  `category_id` varchar(50) DEFAULT NULL,
  `plan_name` text,
  `image` text,
  `status` varchar(10) DEFAULT NULL,
  `total_time` int DEFAULT NULL,
  PRIMARY KEY (`plan_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `WorkoutPlans_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Category` (`category_id`, `category_name`, `description`, `image`) VALUES
('1', 'Weight Loss', 'Plans focused on losing weight', 'https://picsum.photos/200');
INSERT INTO `Category` (`category_id`, `category_name`, `description`, `image`) VALUES
('2', 'Muscle Building', 'Plans focused on building muscles', 'https://picsum.photos/200');
INSERT INTO `Category` (`category_id`, `category_name`, `description`, `image`) VALUES
('91e3bfb2-990b-45e3-9a34-38db7e5ab073', '5435435', '313', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/8f70b2e6e11737a81c3039f80a9c9496%20(1).jpg?alt=media&token=626df59d-715c-4f70-8f8a-c5a7f90ffc39');

INSERT INTO `DailyPlanDetails` (`detail_id`, `plan_id`, `name`, `description`, `exercise_id`, `meal_id`, `day`) VALUES
(6, '2', 'gym', 'Description for Day 2', '2', '1', 3);
INSERT INTO `DailyPlanDetails` (`detail_id`, `plan_id`, `name`, `description`, `exercise_id`, `meal_id`, `day`) VALUES
(42, '1', 'giảm báo', '1234', '1', '1', 1);
INSERT INTO `DailyPlanDetails` (`detail_id`, `plan_id`, `name`, `description`, `exercise_id`, `meal_id`, `day`) VALUES
(44, '1', '6 múi', '1687', '64fe317b-3cdc-4abc-aa36-52a8b80ccf0b', '2', 3);
INSERT INTO `DailyPlanDetails` (`detail_id`, `plan_id`, `name`, `description`, `exercise_id`, `meal_id`, `day`) VALUES
(46, 'f018914f-2d36-4b9b-af80-ab747593ff67', '211', '21212', '1', '2', 1),
(54, 'f2dd55b9-7362-48cd-b049-111086feeedc', 'thinh', '121', '1', '1', 1),
(55, 'f2dd55b9-7362-48cd-b049-111086feeedc', 'user132', '21', '1', '12334', 3),
(56, 'f2dd55b9-7362-48cd-b049-111086feeedc', '212', '2121', '1', '12334', 2),
(57, '1', 'thinh', '1221', '1', '1', 2);

INSERT INTO `Exercises` (`exercise_id`, `exercise_name`, `description`, `video_url`, `image`) VALUES
('1', 'Push-up_v1', 'Description of push-ups', 'https://www.youtube.com/watch?v=VkwCh10R16U', 'https://picsum.photos/200');
INSERT INTO `Exercises` (`exercise_id`, `exercise_name`, `description`, `video_url`, `image`) VALUES
('2', 'Squats', 'Description of squats', 'https://www.youtube.com/watch?v=-7sISWuTdj0', 'https://picsum.photos/200');
INSERT INTO `Exercises` (`exercise_id`, `exercise_name`, `description`, `video_url`, `image`) VALUES
('64fe317b-3cdc-4abc-aa36-52a8b80ccf0b', '123', '1234', 'https://www.youtube.com/watch?v=jG4mY2gD0Zk', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/hinh-anh-do-an.jpg?alt=media&token=d0c78e69-c209-4b90-8945-0f70aa87f8cc');

INSERT INTO `Meals` (`meal_id`, `meal_name`, `description`, `calories`, `image`) VALUES
('1', 'Breakfast', 'Description of breakfast', 1111, 'https://picsum.photos/200');
INSERT INTO `Meals` (`meal_id`, `meal_name`, `description`, `calories`, `image`) VALUES
('12334', 'gà', 'chiên', 12, 'https://picsum.photos/200');
INSERT INTO `Meals` (`meal_id`, `meal_name`, `description`, `calories`, `image`) VALUES
('2', 'Lunch', 'Description of lunch', 500, 'https://picsum.photos/200');

INSERT INTO `PlanExercises` (`id`, `plan_id`, `exercise_id`) VALUES
(35, 'f018914f-2d36-4b9b-af80-ab747593ff67', '1');
INSERT INTO `PlanExercises` (`id`, `plan_id`, `exercise_id`) VALUES
(36, 'f018914f-2d36-4b9b-af80-ab747593ff67', '2');


INSERT INTO `PlanMeals` (`id`, `plan_id`, `meal_id`) VALUES
(44, 'f018914f-2d36-4b9b-af80-ab747593ff67', '2');


INSERT INTO `Users` (`user_id`, `full_name`, `email`, `password`, `phone_number`, `height`, `weight`, `health_index`, `message`, `image`, `status`) VALUES
('6b017637-5008-4483-812f-60e1445c3c4a', 'John Doe', 'johndoe1@example.com', '$2a$10$RsuwIGYEUmomKf.e5ZuUlO5WDMnhLkwgSgqMWTmSlnST0gZ5ppxcq', '1234567890', 175, 150, 48.9796, 'Your BMI is 48.98. Immediate medical intervention and consultation needed: Obese Level III', 'https://picsum.photos/200', 'banned');
INSERT INTO `Users` (`user_id`, `full_name`, `email`, `password`, `phone_number`, `height`, `weight`, `health_index`, `message`, `image`, `status`) VALUES
('c3121633-1d17-4615-bedc-e9a100f23540', 'npt', 'npt@example.com', '$2a$10$t/jm44TWNHeQHD4YbXOlVOYdEnqUb0vv1dcT38s09cY7ZOKpm1tYW', '1234567890', 180, 85, 26.2346, 'Your BMI is 26.23. Attention needed for weight loss: Overweight', 'https://picsum.photos/200', 'banned');


INSERT INTO `UserSelectedPlans` (`selection_id`, `user_id`, `plan_id`, `workout_date`) VALUES
('beb9f5b1-ed54-43bb-95f4-1e2ba691789f', '6b017637-5008-4483-812f-60e1445c3c4a', '1', '2023-12-09');


INSERT INTO `WorkoutPlans` (`plan_id`, `goal`, `fitness_level`, `category_id`, `plan_name`, `image`, `status`, `total_time`) VALUES
('1', 'Lose 10 lbs in 1 month', 'Obese Level III', '91e3bfb2-990b-45e3-9a34-38db7e5ab073', '32133232', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/hinh-de-thuong-don-gian-012.jpg?alt=media&token=29a21973-961a-43cb-9e70-eca9e9aef4be', 'active', 10);
INSERT INTO `WorkoutPlans` (`plan_id`, `goal`, `fitness_level`, `category_id`, `plan_name`, `image`, `status`, `total_time`) VALUES
('2', 'Build upper body strength', 'Advanced', '2', 'avc', 'https://picsum.photos/200', 'active', 10);
INSERT INTO `WorkoutPlans` (`plan_id`, `goal`, `fitness_level`, `category_id`, `plan_name`, `image`, `status`, `total_time`) VALUES
('f018914f-2d36-4b9b-af80-ab747593ff67', 'Lose weight', 'Overweight', '2', 'Weight Loss Plan', 'https://picsum.photos/200', 'active', 8);
INSERT INTO `WorkoutPlans` (`plan_id`, `goal`, `fitness_level`, `category_id`, `plan_name`, `image`, `status`, `total_time`) VALUES
('f2dd55b9-7362-48cd-b049-111086feeedc', 'gym', 'Obese Level II', '2', 'npt', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/hinh-de-thuong-don-gian-012.jpg?alt=media&token=668bd48f-acda-43f8-ab4f-1a53e097d72a', 'active', 12);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;