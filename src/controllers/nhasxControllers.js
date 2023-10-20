// controllers/userController.js

const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.getnhasxAll = async(req, res) => {
    try {
        const nhasx = await new Promise((resolve, reject) => {
            db.query('select * from nhasanxuat', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });

        // Thực hiện truy vấn SQL thứ hai bằng async/await
        const users = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM nhasanxuat', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhasx/index', {
                        nhasx: results
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

exports.getnhasxById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM nhasanxuat WHERE MaNSX = ?', [id], (err, results) => {
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
exports.createnhasx = (req, res) => {
    const { MaNSX, TenNSX, MoTa} = req.body;

    db.query(
        'INSERT INTO nhasanxuat (MaNSX, TenNSX, MoTa) VALUES (?, ?, ?)', [MaNSX, TenNSX, MoTa],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else {
                res.redirect('/admin/nhasx');
            }
        }
    );
};
exports.createnhasx2 = (req, res) => {
    res.render('nhasx/create');
};

// Sửa thông tin một loại sản phẩm bằng ID
exports.updatenhasx = (req, res) => {
    const { id } = req.params;
    const { TenNSX, MoTa } = req.body;
    // const updatedAt = null;

    db.query(
        'UPDATE nhasanxuat SET TenNSX = ?, MoTa = ? WHERE MaNSX = ?', [TenNSX, MoTa, id],
        (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Không tìm thấy mã nhà cung cấp để cập nhật');
            } else {
                res.redirect('/admin/nhasx');
            }
        }
    );
};
exports.updatenhasx2 = async(req, res) => {
    try {
        const nhasx = await new Promise((resolve, reject) => {
            db.query('select * from nhasanxuat', (err, results) => {
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
            db.query('SELECT * FROM nhasanxuat WHERE MaNSX = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('nhasx/edit', {
                        nhasx: results[0]
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
exports.deletenhasx = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM nhasx WHERE nhasxID = ?', [id], (err, results) => {
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