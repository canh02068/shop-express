// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getkhachhangAll = async(req, res) => {
    try {
        const khachhang = await new Promise((resolve, reject) => {
            db.query('select * from khachhang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM khachhang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('khachhang/index', {
                        khachhang: results
                    });
                    console.log(results);
                }
            });

        });

        // Trả về danh sách người dùng đã phân trang và các biến phân trang
        // res.render('users', { layout: 'layouts/main', users: paginatedUsers, title: name });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};

exports.getkhachhangById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM khachhang WHERE KhachHangID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy mã khách hàng');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createkhachhang = (req, res) => {
    const { KhachHangID, HotenKH, NgaySinh, DiachiKH, EmailKH, SdtKH } = req.body;

    db.query(
        'INSERT INTO khachhang (KhachHangID, HotenKH, NgaySinh, DiachiKH, EmailKH, SdtKH) VALUES (?, ?, ?, ?, ?, ?)', [KhachHangID, HotenKH, NgaySinh, DiachiKH, EmailKH, SdtKH],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.redirect('/admin/khachhang');
            }
        }
    );
};
exports.createkhachhang2 = (req, res) => {
    res.render('khachhang/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatekhachhang = (req, res) => {
    const { id } = req.params;
    const { HotenKH, NgaySinh, DiachiKH, EmailKH, SdtKH } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE khachhang SET HotenKH = ?, NgaySinh = ?, DiachiKH = ?, EmailKH = ?, SdtKH = ? WHERE KhachHangID = ?', [HotenKH, NgaySinh, DiachiKH, EmailKH, SdtKH, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy mã khách hàng để cập nhật');
            } else {
                res.redirect('/admin/khachhang');
            }
        }
    );
};
exports.updatekhachhang2 = async(req, res) => {
    try {
        const khachhang = await new Promise((resolve, reject) => {
            db.query('select * from khachhang', (err, results) => {
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
            db.query('SELECT * FROM khachhang WHERE KhachHangID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('khachhang/edit', {
                        khachhang: results[0]
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
exports.deletekhachhang = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM khachhang WHERE KhachHangID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy loại sản phẩm để xóa');
        } else {
            res.json({ message: 'Khách Hàng đã được xóa thành công' });
        }
    });
};