import { Course } from './models/course.model';

export const editIcon = `<![CDATA[
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="#ffffff"/>
  </svg>
]]>`;

export const deleteIcon = `<![CDATA[
  <svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" fill="#ffffff"/>
  </svg>
]]>`;

export const addCourseIconSVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
`;

export const searchIconSvg = `<svg
				class="h-5 w-5 text-gray-400"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>`;

export const COURSE_LIST: Course[] = [
  {
    id: 'course1',
    title: 'Video Course 1. Angular',
    creationDate: new Date(2023, 5, 8),
    duration: 126,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ducimus illo sequi consequatur quibusdam libero fuga, consequuntur dicta vero nihil voluptas? Quidem saepe fugiat voluptas in sit incidunt inventore numquam. Reprehenderit fugit aliquid nemo ipsa iusto voluptatem temporibus odit nihil provident voluptatibus tempora vero, esse natus ratione laborum quia eaque!',
    topRated: true,
  },
  {
    id: 'course2',
    title: 'Video Course 2. Angular',
    creationDate: new Date(2023, 5, 25),
    duration: 49,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ducimus illo sequi consequatur quibusdam libero fuga, consequuntur dicta vero nihil voluptas? Quidem saepe fugiat voluptas in sit incidunt inventore numquam. Reprehenderit fugit aliquid nemo ipsa iusto voluptatem temporibus odit nihil provident voluptatibus tempora vero, esse natus ratione laborum quia eaque!',
  },
  {
    id: 'course3',
    title: 'Video Course 3. React',
    creationDate: new Date(2023, 4, 2),
    duration: 60,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ducimus illo sequi consequatur quibusdam libero fuga, consequuntur dicta vero nihil voluptas? Quidem saepe fugiat voluptas in sit incidunt inventore numquam. Reprehenderit fugit aliquid nemo ipsa iusto voluptatem temporibus odit nihil provident voluptatibus tempora vero, esse natus ratione laborum quia eaque!',
  },
];
