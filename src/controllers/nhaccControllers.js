// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getnhaccAll = async(req, res) => {
    try {
        const nhacc = await new Promise((resolve, reject) => {
            db.query('select * from nhacc', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM nhacc', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhacc/index', {
                        nhacc: results
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

exports.getnhaccById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM nhacc WHERE NhaCCID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy mã nhà cung cấp');
        } else {
            res.json(results[0]);
        }
    });
};

// Thêm một loại sản phẩm mới
exports.createnhacc = (req, res) => {
    const { NhaCCID, TenNCC, diachiNCC, SdtNCC } = req.body;

    db.query(
        'INSERT INTO nhacc (NhaCCID, TenNCC, diachiNCC, SdtNCC) VALUES (?, ?, ?, ?)', [NhaCCID, TenNCC, diachiNCC, SdtNCC],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.redirect('/admin/nhacc');
            }
        }
    );
};
exports.createnhacc2 = (req, res) => {
    res.render('nhacc/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatenhacc = (req, res) => {
    const { id } = req.params;
    const { TenNCC, diachiNCC, SdtNCC } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE nhacc SET TenNCC = ?, diachiNCC = ?, SdtNCC = ? WHERE nhaCCID = ?', [TenNCC, diachiNCC, SdtNCC, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy mã nhà cung cấp để cập nhật');
            } else {
                res.redirect('/admin/nhacc');
            }
        }
    );
};
exports.updatenhacc2 = async(req, res) => {
    try {
        const nhacc = await new Promise((resolve, reject) => {
            db.query('select * from nhacc', (err, results) => {
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
            db.query('SELECT * FROM nhacc WHERE nhaCCID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhacc/edit', {
                        nhacc: results[0]
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
exports.deletenhacc = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM nhacc WHERE NhaCCID = ?', [id], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Không tìm thấy nhà cung cấp để xóa');
        } else {
            res.json({ message: 'Nhà Cung Cấp đã được xóa thành công' });
        }
    });
};