const sections = {
  "machine-learning": {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Machine learning algorithms, deep learning, neural networks, and AI systems",
    icon: "Brain",
    color: "fuchsia",
    topics: [
      {
        id: "transformers-attention",
        title: "Transformers & Attention",
        description: "Self-attention, multi-head attention, BERT, GPT architectures",
        content: `
# Transformers and Attention Mechanisms

The Transformer architecture, introduced in the paper "Attention Is All You Need" (2017), revolutionized Natural Language Processing (NLP). Unlike Recurrent Neural Networks (RNNs), Transformers process input data in parallel, allowing for much faster training on larger datasets.

### Self-Attention Mechanism
The core of the Transformer is the self-attention mechanism, which relates different positions of a single sequence in order to compute a representation of the sequence.

**The Equation:**
\`\`\`math
\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V
\`\`\`

Where:
- **Q**: Query matrix
- **K**: Key matrix
- **V**: Value matrix
- **$d_k$**: Dimension of keys (scaling factor)

### Multi-Head Attention
Instead of performing a single attention function, the Transformer uses multiple attention "heads" to focus on different parts of the input simultaneously.

\`\`\`python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.d_model = d_model
        
        assert d_model % self.num_heads == 0
        
        self.depth = d_model // self.num_heads
        
        self.wq = nn.Linear(d_model, d_model)
        self.wk = nn.Linear(d_model, d_model)
        self.wv = nn.Linear(d_model, d_model)
        
        self.dense = nn.Linear(d_model, d_model)
        
    def split_heads(self, x, batch_size):
        x = x.view(batch_size, -1, self.num_heads, self.depth)
        return x.transpose(1, 2)
\`\`\`

### Architectures
1.  **Encoder-Only (BERT)**: Bidirectional Encoder Representations from Transformers. Good for classification and answer extraction.
2.  **Decoder-Only (GPT)**: Generative Pre-trained Transformer. Good for text generation.
3.  **Encoder-Decoder (T5, BART)**: Good for translation and summarization.
        `,
      },
      {
        id: "gradient-descent-optimization",
        title: "Optimization Algorithms",
        description: "SGD, Adam, RMSprop, learning rate schedules",
        content: `
# Optimization Algorithms

Optimization algorithms are used to update the parameters of a neural network to minimize the loss function.

### Gradient Descent
The most basic optimization algorithm. It updates weights in the opposite direction of the gradient of the loss function.

\`\`\`math
\\theta_{t+1} = \\theta_t - \\eta \\nabla J(\\theta_t)
\`\`\`

Where $\\eta$ is the learning rate.

### Stochastic Gradient Descent (SGD)
Updates parameters using only a single sample (or a small batch) at a time. It is faster but noisier.

### Momentum
Helps accelerate SGD in the relevant direction and dampens oscillations.
\`\`\`math
v_t = \\gamma v_{t-1} + \\eta \\nabla J(\\theta)
\`\`\`
\`\`\`math
\\theta = \\theta - v_t
\`\`\`

### Adam (Adaptive Moment Estimation)
Combines the benefits of AdaGrad and RMSProp. It adapts the learning rate for each parameter.

\`\`\`python
# Adam Update Rule Implementation Concept
m_t = beta1 * m_{t-1} + (1 - beta1) * g_t
v_t = beta2 * v_{t-1} + (1 - beta2) * g_t^2

m_hat = m_t / (1 - beta1^t)
v_hat = v_t / (1 - beta2^t)

theta_{t+1} = theta_t - learning_rate * m_hat / (sqrt(v_hat) + epsilon)
\`\`\`
        `,
      },
      {
        id: "cnn-architectures",
        title: "CNN Architectures",
        description: "ResNet, VGG, Inception, EfficientNet, Vision Transformers",
        content: `
# Convolutional Neural Networks (CNNs)

CNNs are specialized neural networks for processing data that has a known grid-like topology, such as time-series data (1-D grid) and image data (2-D grid).

### Core Components
1.  **Convolutional Layer**: Applies filters (kernels) to the input to create feature maps.
2.  **Pooling Layer**: Reduces the spatial dimensions (downsampling). Max Pooling is the most common.
3.  **Fully Connected Layer**: Used at the end for classification.

### Famous Architectures

#### VGG (Visual Geometry Group)
Known for its simplicity, using only $3 \\times 3$ convolutional layers stacked on top of each other in increasing depth.

#### ResNet (Residual Network)
Introduced "skip connections" (residual blocks) to allow training of very deep networks (e.g., ResNet-50, ResNet-101) by mitigating the vanishing gradient problem.

\`\`\`math
y = F(x, \\{W_i\\}) + x
\`\`\`

#### EfficientNet
Uses a compound scaling method to scale network depth, width, and resolution uniformly.

\`\`\`python
import torch.nn as nn

# Basic Residual Block
class ResidualBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride=1):
        super(ResidualBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=stride, padding=1)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.relu = nn.ReLU(inplace=True)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, stride=1, padding=1)
        self.bn2 = nn.BatchNorm2d(out_channels)
        
        self.shortcut = nn.Sequential()
        if stride != 1 or in_channels != out_channels:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=1, stride=stride),
                nn.BatchNorm2d(out_channels)
            )

    def forward(self, x):
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        out += self.shortcut(x)
        out = self.relu(out)
        return out
\`\`\`
        `,
      },
      {
        id: "generative-models",
        title: "Generative Models",
        description: "GANs, VAEs, Diffusion Models, Normalizing Flows",
        content: `
# Generative Models

Generative models are a class of ML models trained to generate new data instances that resemble the training data.

### 1. Generative Adversarial Networks (GANs)
Consists of two networks fighting against each other:
-   **Generator ($G$)**: Tries to maximize the probability of making the Discriminator mistake its output for real data.
-   **Discriminator ($D$)**: Tries to effectively distinguish between real data and data generated by $G$.

**Minimax Game:**
\`\`\`math
\\min_G \\max_D V(D, G) = \\mathbb{E}_{x \\sim p_{data}(x)}[\\log D(x)] + \\mathbb{E}_{z \\sim p_z(z)}[\\log(1 - D(G(z)))]
\`\`\`

### 2. Variational Autoencoders (VAEs)
Encodes input into a distribution (latent space) rather than a single point.
**Loss Function**: Reconstruction Loss + KL Divergence (regularizer).

### 3. Diffusion Models
State-of-the-art for image generation (e.g., DALL-E 2, Stable Diffusion).
They work by strictly destroying structure in data through a forward diffusion process (adding noise) and then learning to recover the structure through a reverse diffusion process (removing noise).

**Forward Process ($q$)**:
\`\`\`math
q(x_t | x_{t-1}) = \\mathcal{N}(x_t; \\sqrt{1 - \\beta_t} x_{t-1}, \\beta_t I)
\`\`\`
        `,
      },
      {
        id: "mlops-deployment",
        title: "MLOps & Deployment",
        description: "Model serving, monitoring, A/B testing, CI/CD",
        content: `
# MLOps and Model Deployment

MLOps (Machine Learning Operations) is a set of practices that aims to deploy and maintain machine learning models in production reliably and efficiently.

### Key Components

1.  **Model Registery**: Centralized repository for storing and versioning trained models (e.g., MLflow, AWS SageMaker Registry).
2.  **Model Serving**:
    -   **Batch Inference**: Generating predictions on a large batch of data offline.
    -   **Online Inference**: Generating predictions in real-time via REST/gRPC APIs (e.g., TensorFlow Serving, TorchServe, Triton).
3.  **Monitoring**:
    -   **Data Drift**: Change in model input data distribution.
    -   **Concept Drift**: Change in the relationship between input variables and the target variable.

### CI/CD for ML (CT - Continuous Training)
Unlike traditional software, ML systems need a CT pipeline.
-   **Trigger**: New data availability or performance degradation.
-   **Steps**: Data validation -> Model retraining -> Model evaluation -> Deployment.

\`\`\`yaml
# Example GitHub Actions Workflow for ML
name: Train and Deploy
on: [push]
jobs:
  train-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Train Model
        run: python train_model.py
      - name: Evaluate Model
        run: python evaluate_model.py
      - name: Deploy to Cloud
        if: success()
        run: python deploy.py
\`\`\`
        `,
      },
    ],
  },
};

export const aiMlData = {
  getSection: (sectionId) => sections[sectionId],
};
