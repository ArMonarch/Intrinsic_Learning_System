import { LessonAndQuizComponent } from "@/components/LessonsAndQuizArrayComponent";

export const metadata = {
    title: "Lesson"
}

async function getCourseLessons (id) {
    try{
        const res = await fetch(`http://localhost:8081/courses/listCourseUnits/${id}`, {cache:'no-store'})
        const Data = await res.json()
        if (!Data.error){return Data.data}
        else {throw new Error(Data.error)}
      }catch(error){console.log(error)}
}

function getLessons(data, unitName) {
    for(const item of data){
        if (item.unit === unitName){return item.content}
        else {return null}
    }
}

async function getCourseLesson (id) {
    try{
        const res = await fetch(`http://localhost:8081/courses/getUnitContent?uid=${id}`, {cache:'no-store'})
        const Data = await res.json()
        if (!Data.error){return Data.data}
        else {throw new Error(Data.error)}
    }catch{}
}

async function SubLessons({params, searchParams}) {
    const courseLessons = await getCourseLessons(searchParams.courseId)
    const courseLesson = getLessons(courseLessons, searchParams.lessonName)
    const lessonId = searchParams.lessonId
    return(
        <div><LessonAndQuizComponent Lessons={courseLesson} LessonId={lessonId}/></div>   
    );
};

export default SubLessons;