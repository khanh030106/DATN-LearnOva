const LessonResourceList = ({resources = []}) => {
    if (resources.length === 0) {
        return null;
    }

    return (
        <ul className="teacher-lesson-resource-list">
            {resources.map((resource) => (
                <li key={resource.id || resource.name || resource.url}>
                    {resource.name || resource.fileName || "Lesson resource"}
                </li>
            ))}
        </ul>
    );
};

export default LessonResourceList;
