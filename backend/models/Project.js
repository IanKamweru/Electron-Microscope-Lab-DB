// Project model

class Project {
    constructor(project_name, supervising_professor, student_researchers, goal) {
        this.project_name = project_name;
        this.supervising_professor = supervising_professor;
        this.student_researchers = student_researchers;
        this.goal = goal;
   } 
}

module.exports = Project;
