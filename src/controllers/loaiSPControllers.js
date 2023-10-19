// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getLoaiSPAll = async(req, res) => {
    try {
        const loaihang = await new Promise((resolve, reject) => {
            db.query('select * from loaihang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM loaihang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('loaisp/index', {
                        loaihang: results
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

exports.getLoaispById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM loaihang WHERE LoaiHangID = ?', [id], (err, results) => {
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
exports.createLoaisp = (req, res) => {
    const { LoaiHangID, TenLH } = req.body;

    db.query(
        'INSERT INTO loaihang (LoaiHangID, TenLH) VALUES (?, ?)', [LoaiHangID, TenLH],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.redirect('/admin/loaisp');
            }
        }
    );
};
exports.createLoaisp2 = (req, res) => {
    res.render('loaisp/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updateLoaisp = (req, res) => {
    const { id } = req.params;
    const { TenLH } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE loaihang SET TenLH = ? WHERE LoaiHangID = ?', [TenLH, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy loại sản phẩm để cập nhật');
            } else {
                res.redirect('/admin/loaisp');
            }
        }
    );
};
exports.updateLoaisp2 = async(req, res) => {
    try {
        const loaihang = await new Promise((resolve, reject) => {
            db.query('select * from loaihang', (err, results) => {
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
            db.query('SELECT * FROM loaihang WHERE LoaiHangID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('loaisp/edit', {
                        loaihang: results[0]
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
exports.deleteLoaisp = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM loaihang WHERE LoaiHangID = ?', [id], (err, results) => {
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