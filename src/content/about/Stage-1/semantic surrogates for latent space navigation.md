# Semantic surrogates for latent space navigation

The majority of this work concerns latent spaces for generative audio models. Latent spaces are great because they offer compressed representations of a deep learning model. This should make it easy to generate and manipulate sampled audio, however, without strict regularisation during training, latent spaces are poorly navigable for humans. The axes aren’t labelled, and when users load a new model, the axes change, so what they’ve learned becomes pointless.

The design questions at the core of this paper are:
- How do we design latent space interactions so that users can better/quicker understand the nature of the latent space?
- Once a user understands one latent space, how can we design so that the aquisition of skills in other, similar spaces is relatively straightforward?

## Background – XAI audio
existing solutions which attempt to address these issues include:

### Vague/random mappings:
nick mb

### Interactive machine learning paradigms
teaching a machine?
gabrirel...
Lots of end-user cost, how do they find the points to begin with, not transferable

### Latent space regularisation
lerch, other stuff, more other stuff....
normative 

### Audio feature mapping

### Unsupervised methods
tsne, feature permutation

### Lime and other xai stuff?


## A multi-agent black-box: Reperameterising the explainability problem?

The above methods are...

one commonality is the use of audio for explanations....we are expecting the user to audition all of the model's outputs....

### Latent space cartography with crossmodal associations
- bob sturm
- 
- haptics?


## Background – Latent spaces for audio
what are the fundamentals in how audio is processed in a neural audio system? When we discuss the creation of a sound/its quality, we must ask what this is. Generally, there are 3 scopes at which sound might be discussed.

- temporal
- timbral
- frequencial

'timbre' is usually used to describe the nature of a sound. Not pitch or volume, timbre is this middle ground between the time we percieve over, what we percieve, and that data which comprises it, it is an intantaneous moment of the sound. *Analogy/example from timbre studies here....* some quotes. When discussing timbre in her metaphysics of....daphne oram writes:

similarly, pierre shaffer speaks of:

david toop writes:


Understanding what timbre really is and what it is not, is quite fundamental to understanding the neural audio synthesis. In a neural audio system: similar distinctions are drawn.

There is the sample-by-sample basis on which a sound is created – from....
then, once we have enough [the window size of our model] of those, we have a chunk of audio, typically refered to as a grain. The nature of this grain evolves/changes over time.

We can see this architecture repeated in tools like (add a sentence on the shape of the latent space, and how samples are created)
In a VAE architectures, such as that employed in RAVE (a very popular neural synthesis tool), these chunks of audio are represented by multidimensional vectors. The distribution of these vectors comprises a latent space. The parameters of this space are often exposed to the user as a convenient method of control....:

- neural granular synthesis 
- granular, model architectures?
- wavenet
- nsynth
- rave 

how do we control these models? (or rather, what do the controls have to do with the output?)

benefits and drawbacks of each approach...what are the tradeoffs in general?

### Latent spaces in practice:
The neural synthesis tools above are used in a diverse range of applications, because they offer compact representations of sound...?
- Latent spaces for recsys
- Latent spaces for timbre transfer
- Timbre manipulation/effects
- Sound generation
- Latent spaces as a medium for artwork, moises horta

discuss the different needs of these diff practices. for example: what is a representative sample when we generate audio from latent space rather than using it for recall? Therefore, the explanation must be use-case specific.

## Generic/agnostic, Post-hoc approaches to explaining outputs from latent spaces, and inputs to human minds

We want to explain what our model is doing, but we want to be careful about how we define this problem....Designing explanations for domain-experts requires speaking to them in a language they understand. For example, as discussed above, audio explanations usually involve text, visuals, embodiment, or haptics. Imagine the user is also in the black box that we are trying to explain:
instead of considering the model to be explained as "user input-> model output", why not "user input-> model output –> user perception". With this approach, the explanation problems described earlier instead become:

### Example-based explanations
- Example maps
- Examples and feature contribution

### Feature erduction/mapping
random forests, feature permutation, pca and the relevance of 'representative data'

### multi-agent Surrogate models
Lime is the most famous application of surrogate model approaches....


## My system, outline, aims and implementation

aims

initial attempts and misunderstandings

parameterising the problem and my approach, some maths....

technical implementation, pipeline

evaluating performance, discussion

future evaluation

## Future directions, better understanding how people describe timbre

timbre fun
spectromorphology
interviews, observation and corpus analysis


———

In this presentation, I will outline the potential benefits of semantic surrogate models to address these issues, presenting a work-in-progress system for navigating pretrained latent spaces in a more semantically motivated way.

——— 
First, let’s go over the basics neural audio systems.

Generally a neural audio system has a deep neural network which generates sound on a sample-by-sample basis. 



By feeding values into these parameters, we can generate sounds from the model.

———
However, In the case of models like RAVE, the axes of the latent space are unlabelled, so we have no idea what each input will do until we hear it. 

We could enforce some labels during training, leveraging a method called latent space regularisation, but this is expensive, and a waste of perfectly good, pre-trained models.

We could interactively learn labels, but how do we find these points in the first place, and what do we do when we want to use a new model?

———
Instead, I propose we modularise this process, by using surrogate models to learn the relationship between input parameters and our output descriptors…

First, we randomly sample points from our latent space, then we classify the resultant sounds using one of the many timbre descriptors out there.

Using a multi-layer-perceptron regressor, we then create a simple surrogate model which maps between the two, allowing us to navigate the latent space using descriptors or parameters.

———

Additionally, any mappings we create based on this semantic model can be transferred, even when we switch between generative models

———

Some assumptions:

- Since we will be generating from any point in the latent space, its whole distribution is ‘representative’. 
This means that we don’t need a ‘representative’ dataset to generate our model through something like random forests, and can just create our dataset with random sampling.

- However, we ARE presuming that the output of our rave model is within the expected input distribution of the classifier, and that it will be heterogeneous and deterministic enough for us to learn some trend from it

This can be bad. For example, using a generative model for speech won’t work well, since the descriptor was not built for that type of input.


———
Separating generation and description models has many benefits for end users. However, all of this has me wondering how perceptually relevant ‘perceptually relevant’ labels are. How do we actually describe audio? Is this generic or domain specific? And how can we leverage this for more appropriate latent space navigation?

I’m currently undertaking interviews and observational ethnographies with sample-based composers, hoping to answer some of these questions. The aim is to develop explainable generative models which, if not immediately suitable, are tweakable by end users. I look forward to discussing this with all of you.


My task was to leverage perceptually meaningful labels/mappings to make a given deep generative audio model explainable and navigable. My constraints were that the model had to still operate in real-time at audio-rate (48khz) and that the generative model could be switched out for any other. 

I first reviewed literature on audio classification and music perception. Combining these with my existing knowledge of explainable AI, I created a toolchain and interface which, given an input model, returns:
-	Perceptual labels for the latent space (given as a heatmap)
-	Simple, interpretable mappings between the output labels and inputs to the model (eg: increasing “harshness” creates a corresponding change in the latent space)

Pending additional perceptual/user studies, this toolchain will facilitate the use and adaptation of pretrained models by musicians. This task required backend (python, pytorch) and frontend (max/msp, javascript) engineering skills as well as DL (CNNs), XAI (Feature permutation, surrogate models) and interactive system design skills.


