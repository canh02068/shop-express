// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getnhanvienAll = async(req, res) => {
    try {
        const nhanvien = await new Promise((resolve, reject) => {
            db.query('select * from nhanvien', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM nhanvien', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhanvien/index', {
                        nhanvien: results
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

exports.getnhanvienById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM nhanvien WHERE NhanVienID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy mã nhân viên');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createnhanvien = (req, res) => {
    const { NhanVienID, HotenNV, GioitinhNV,  NgaysinhNV, diachiNV, EmailNv, SdtNV } = req.body;

    db.query(
        'INSERT INTO nhanvien (NhanVienID, HotenNV, GioitinhNV,  NgaysinhNV, diachiNV, EmailNv, SdtNV) VALUES (?, ?, ?, ?, ?, ?, ?)', [NhanVienID, HotenNV, GioitinhNV,  NgaysinhNV, diachiNV, EmailNv, SdtNV],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.redirect('/admin/nhanvien');
            }
        }
    );
};
exports.createnhanvien2 = (req, res) => {
    res.render('nhanvien/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatenhanvien = (req, res) => {
    const { id } = req.params;
    const { HotenNV, GioitinhNV,  NgaysinhNV, diachiNV, EmailNv, SdtNV } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE nhanvien SET HotenNV = ?, GioitinhNV = ?, NgaysinhNV = ?, diachiNV = ?, EmailNv = ?, SdtNV = ? WHERE NhanVienID = ?', [HotenNV, GioitinhNV,  NgaysinhNV, diachiNV, EmailNv, SdtNV, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy mã nhân viên để cập nhật');
            } else {
                res.redirect('/admin/nhanvien');
            }
        }
    );
};
exports.updatenhanvien2 = async(req, res) => {
    try {
        const nhanvien = await new Promise((resolve, reject) => {
            db.query('select * from nhanvien', (err, results) => {
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
            db.query('SELECT * FROM nhanvien WHERE NhanVienID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhanvien/edit', {
                        nhanvien: results[0]
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
exports.deletenhanvien = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM nhanvien WHERE NhanVienID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy mã nhân viên để xóa');
        } else {
            res.json({ message: 'Nhân viên đã được xóa thành công' });
        }
    });
};