// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getgiasanphamAll = async(req, res) => {
    try {
        const giasanpham = await new Promise((resolve, reject) => {
            db.query('select * from giasanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM giasanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('giasanpham/index', {
                        giasanpham: results
                    });
                }
            });

        });

        // Trả về danh sách người dùng đã phân trang và các biến phân trang
        // res.render('users', { layout: 'layouts/main', users: paginatedUsers, title: name });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

exports.getgiasanphamById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM giasanpham WHERE MaGiaSanPHam = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy loại sản phẩm');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.creategiasanpham = (req, res) => {
    const { MaGiaSanPHam, SPID, NgayBatDau, NgayKetThuc, Gia } = req.body;

    db.query(
        'INSERT INTO giasanpham (MaGiaSanPHam, SPID, NgayBatDau, NgayKetThuc, Gia) VALUES (?, ?. ?, ?, ?)', [MaGiaSanPHam, SPID, NgayBatDau, NgayKetThuc, Gia],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.redirect('/admin/giasanpham');
            }
        }
    );
};
exports.creategiasanpham2 = (req, res) => {
    res.render('giasanpham/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updategiasanpham = (req, res) => {
    const { id } = req.params;
    const { TenLH } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE giasanpham SET TenLH = ? WHERE giasanphamID = ?', [TenLH, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy loại sản phẩm để cập nhật');
            } else {
                res.redirect('/admin/giasanpham');
            }
        }
    );
};
exports.updategiasanpham2 = async(req, res) => {
    try {
        const giasanpham = await new Promise((resolve, reject) => {
            db.query('select * from giasanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const { id } = req.params;

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM giasanpham WHERE giasanphamID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('giasanpham/edit', {
                        giasanpham: results[0]
                    });
                }
            });

        });

        // Trả về danh sách người dùng đã phân trang và các biến phân trang
        // res.render('users', { layout: 'layouts/main', users: paginatedUsers, title: name });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

// Xóa một loại sản phẩm bằng ID
exports.deletegiasanpham = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM giasanpham WHERE giasanphamID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy loại sản phẩm để xóa');
        } else {
            res.json({ message: 'Loại sản phẩm đã được xóa thành công' });
        }
    });
};