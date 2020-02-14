exports.login = function (req, res) {
    res.render('login');
};
exports.register = function (req, res) {
    res.render('register');
};
exports.home = function (req, res) {
    res.render('home');
};

exports.workouts = function (req, res) {
    res.render('workouts');
};

exports.workout = function (req, res){
    res.render('workout');
}