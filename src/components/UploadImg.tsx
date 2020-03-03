import React from 'react'
import { Upload, Icon, message } from 'antd';

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class UploadImg extends React.Component {
  public state = {
    loading: false,
    imageUrl: ''
  };

  public handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const imageUrl = info.file.response.url
      if (info.file.response.url) {
        message.success('上传成功')
        this.setState({ loading: false, imageUrl});
      }
    }
  };

  public render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="img"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:3070/api/file/v1/uploadImg"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}
