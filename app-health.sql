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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `fitness_level` text,
  `category_id` varchar(50) DEFAULT NULL,
  `plan_name` text,
  `image` text,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`plan_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `WorkoutPlans_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Category` (`category_id`, `category_name`, `description`, `image`) VALUES
('1', 'Weight Loss', 'Plans focused on losing weight', 'weight_loss_image_url');
INSERT INTO `Category` (`category_id`, `category_name`, `description`, `image`) VALUES
('2', 'Muscle Building', 'Plans focused on building muscles', 'muscle_building_image_url');


INSERT INTO `DailyPlanDetails` (`detail_id`, `plan_id`, `name`, `description`, `exercise_id`, `meal_id`, `day`) VALUES
(4, '1', 'cutting', 'Description for Day 3', '1', '2', 3);
INSERT INTO `DailyPlanDetails` (`detail_id`, `plan_id`, `name`, `description`, `exercise_id`, `meal_id`, `day`) VALUES
(6, '2', 'gym', 'Description for Day 2', '2', '1', 3);
INSERT INTO `DailyPlanDetails` (`detail_id`, `plan_id`, `name`, `description`, `exercise_id`, `meal_id`, `day`) VALUES
(18, '1', 'health', 'Description for Day 1', '1', '2', 1);
INSERT INTO `DailyPlanDetails` (`detail_id`, `plan_id`, `name`, `description`, `exercise_id`, `meal_id`, `day`) VALUES
(29, '1', 'eewqe', '321313', '1', '12334', 2),
(32, '1', '43324', '3443', '64fe317b-3cdc-4abc-aa36-52a8b80ccf0b', '1', 4),
(33, '1', '54335', '432432', '2', '1', 5);

INSERT INTO `Exercises` (`exercise_id`, `exercise_name`, `description`, `video_url`, `image`) VALUES
('1', 'Push-up_v1', 'Description of push-ups', 'https://www.youtube.com/watch?v=VkwCh10R16U', 'https://picsum.photos/200');
INSERT INTO `Exercises` (`exercise_id`, `exercise_name`, `description`, `video_url`, `image`) VALUES
('2', 'Squats', 'Description of squats', 'squats_video_url', 'https://picsum.photos/200');
INSERT INTO `Exercises` (`exercise_id`, `exercise_name`, `description`, `video_url`, `image`) VALUES
('64fe317b-3cdc-4abc-aa36-52a8b80ccf0b', '123', '1234', 'https://www.youtube.com/watch?v=jG4mY2gD0Zk', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/hinh-anh-do-an.jpg?alt=media&token=d0c78e69-c209-4b90-8945-0f70aa87f8cc');

INSERT INTO `Meals` (`meal_id`, `meal_name`, `description`, `calories`, `image`) VALUES
('1', 'Breakfast', 'Description of breakfast', 1111, 'https://picsum.photos/200');
INSERT INTO `Meals` (`meal_id`, `meal_name`, `description`, `calories`, `image`) VALUES
('12334', '4324', '4324', 243434, '432');
INSERT INTO `Meals` (`meal_id`, `meal_name`, `description`, `calories`, `image`) VALUES
('2', 'Lunch', 'Description of lunch', 500, 'https://picsum.photos/200');
INSERT INTO `Meals` (`meal_id`, `meal_name`, `description`, `calories`, `image`) VALUES
('53fed1a0-95b9-48ca-8333-fc501035facb', '1111', '111', 11, 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/hinh-anh-do-an.jpg?alt=media&token=41a8e9b2-d1de-498e-8f23-1e63e9c62d6b');

INSERT INTO `PlanExercises` (`id`, `plan_id`, `exercise_id`) VALUES
(8, 'f018914f-2d36-4b9b-af80-ab747593ff67', '1');
INSERT INTO `PlanExercises` (`id`, `plan_id`, `exercise_id`) VALUES
(9, 'f018914f-2d36-4b9b-af80-ab747593ff67', '2');
INSERT INTO `PlanExercises` (`id`, `plan_id`, `exercise_id`) VALUES
(13, '1', '1');

INSERT INTO `PlanMeals` (`id`, `plan_id`, `meal_id`) VALUES
(14, 'f018914f-2d36-4b9b-af80-ab747593ff67', '1');
INSERT INTO `PlanMeals` (`id`, `plan_id`, `meal_id`) VALUES
(15, 'f018914f-2d36-4b9b-af80-ab747593ff67', '2');


INSERT INTO `Users` (`user_id`, `full_name`, `email`, `password`, `phone_number`, `height`, `weight`, `health_index`, `message`, `image`, `status`) VALUES
('6b017637-5008-4483-812f-60e1445c3c4a', 'John Doe', 'johndoe1@example.com', '$2a$10$RsuwIGYEUmomKf.e5ZuUlO5WDMnhLkwgSgqMWTmSlnST0gZ5ppxcq', '1234567890', 175, 150, 48.9796, 'Your BMI is 48.98. Immediate medical intervention and consultation needed: Obese Level III', 'abc', 'banned');
INSERT INTO `Users` (`user_id`, `full_name`, `email`, `password`, `phone_number`, `height`, `weight`, `health_index`, `message`, `image`, `status`) VALUES
('c3121633-1d17-4615-bedc-e9a100f23540', 'npt', 'npt@example.com', '$2a$10$t/jm44TWNHeQHD4YbXOlVOYdEnqUb0vv1dcT38s09cY7ZOKpm1tYW', '1234567890', 180, 85, 26.2346, 'Your BMI is 26.23. Attention needed for weight loss: Overweight', 'abc', 'active');


INSERT INTO `UserSelectedPlans` (`selection_id`, `user_id`, `plan_id`, `workout_date`) VALUES
('beb9f5b1-ed54-43bb-95f4-1e2ba691789f', '6b017637-5008-4483-812f-60e1445c3c4a', '1', '2023-12-09');


INSERT INTO `WorkoutPlans` (`plan_id`, `goal`, `start_date`, `end_date`, `fitness_level`, `category_id`, `plan_name`, `image`, `status`) VALUES
('1', 'Lose 10 lbs in 1 month', '2023-01-01', '2023-01-31', 'Obese Level III', '1', '345', 'https://picsum.photos/200', 'active');
INSERT INTO `WorkoutPlans` (`plan_id`, `goal`, `start_date`, `end_date`, `fitness_level`, `category_id`, `plan_name`, `image`, `status`) VALUES
('2', 'Build upper body strength', '2023-02-03', '2023-02-28', 'Advanced', '2', 'avc', NULL, 'inactive');
INSERT INTO `WorkoutPlans` (`plan_id`, `goal`, `start_date`, `end_date`, `fitness_level`, `category_id`, `plan_name`, `image`, `status`) VALUES
('3351d8d1-5451-42b2-a0fe-0a7d609b8ac5', '12121', '2023-12-22', '2023-12-30', 'Obese Level I', NULL, '345', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/8f70b2e6e11737a81c3039f80a9c9496%20(1).jpg?alt=media&token=a9674113-3d06-4e39-8974-b04578696a88', 'inactive');
INSERT INTO `WorkoutPlans` (`plan_id`, `goal`, `start_date`, `end_date`, `fitness_level`, `category_id`, `plan_name`, `image`, `status`) VALUES
('53aff3d6-0457-41a2-bd2a-14ccca3475f4', '43242', '2023-12-21', '2023-12-23', 'Underweight', NULL, '345', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/8f70b2e6e11737a81c3039f80a9c9496%20(1).jpg?alt=media&token=ede4bea1-cb42-48ad-b38f-14a4c059ca2a', 'active'),
('5f90978f-0ebe-4875-b67d-321f726977a2', 'tert', '2023-12-21', '2023-12-24', 'Overweight', NULL, '1267', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/8f70b2e6e11737a81c3039f80a9c9496%20(1).jpg?alt=media&token=0dd210d6-f47b-441d-b489-0053e31bb33b', 'active'),
('85a47401-9a87-49f0-87d4-7967636f8a53', '32131321', '2023-12-12', '2023-12-16', 'Obese Level II', NULL, '312332313', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/hinh-anh-do-an.jpg?alt=media&token=5c15c7a1-b934-44fe-825e-d5ad0ea79df9', 'active'),
('dca8e3b7-be73-4833-af4e-54c9c3ab8990', '1122', '2023-12-12', '2023-12-17', 'Obese Level III', NULL, 'npt', 'https://firebasestorage.googleapis.com/v0/b/project-app-health.appspot.com/o/8f70b2e6e11737a81c3039f80a9c9496%20(1).jpg?alt=media&token=cb8de823-d028-4e27-9cd4-5884a77c97ca', 'active'),
('f018914f-2d36-4b9b-af80-ab747593ff67', 'Lose weight', '2023-12-31', '2024-01-31', 'Overweight', NULL, 'Weight Loss Plan', 'https://example.com/image.jpg', 'inactive');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;