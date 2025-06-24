const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { courseValidation } = require('../validation');
const auth = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const { category, level, search } = req.query;
        let query = {};
        
        if (category) query.category = category;
        if (level) query.level = level;
        if (search) query.title = { $regex: search, $options: 'i' };
        
        const courses = await Course.find(query).populate('instructor', 'name');
        res.send(courses);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get single course
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name avatar');
        if (!course) return res.status(404).send('Course not found');
        res.send(course);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).send('Course not found');

        const user = await User.findById(req.user._id);
        const alreadyEnrolled = user.enrolledCourses.some(c => c.courseId.equals(course._id));
        
        if (alreadyEnrolled) {
            return res.status(400).send('Already enrolled in this course');
        }

        user.enrolledCourses.push({
            courseId: course._id,
            progress: 0
        });

        course.students += 1;
        
        await user.save();
        await course.save();
        
        res.send({ message: 'Successfully enrolled in course' });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;