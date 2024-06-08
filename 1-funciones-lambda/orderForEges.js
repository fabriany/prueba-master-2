export const handler = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'The body is requered' })
            };
        }

        const persons = event.body.persons || [];
        if (!Array.isArray(persons) || !persons.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Persons must be array > 0' })
            };
        }

        const invalidPersons = persons.filter(persons => !persons.name || !persons.ege);
        if (invalidPersons.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'name and ege are requered ',
                    invalidPersons: invalidPersons
                })
            };
        }

        const ordenEgePersons = persons.sort((a, b) => b.ege - a.ege);

        return {
            statusCode: 200,
            body: JSON.stringify({ ordenEgePersons: ordenEgePersons })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};