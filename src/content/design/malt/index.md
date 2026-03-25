---
title: "MALT – Manipulating Audio with Latent Timbre"
author: "Ash"
date: "2026-03-25"
image: "./malt_logo_hops.png"
tags: ["NIME", "NISE", "Selected"]
---


<!-- # Manipulating Audio with Latent Timbre -->

In my PhD I look at how we might rethink AI systems from the perspectives of empowering individual or marginalised forms of musical expression. In particular I look at sample-based music making, and how AI is impacting the relationships between creators, communities, sounds and technologies.  

## Can AI Support Sampling?

Can AI support sampling? Kind of… AI is super useful for organising and finding samples in a library[^1], or for re-synthesising a target sound from scratch[^2]. We’re even at a point where generative models are small and quick enough to run on local machines in real-time, allowing us to play back large libraries of samples like instruments.

All of these technologies rely on what is called a ‘latent representation’. This is the middle bit that an AI model learns between input and output, the innards of the system. There are several approaches for structuring latent representations, such as prioritising user interpretability[^3], prioritising impact on the sound[^4], or prioritising information efficiency for communication with other AI systems[^5].

Each of these has their own affordances, but they have a fundamental issue, they are fixed. What if I think about my sound differently to you, or to the folks at Meta? None of these models are trained on my sounds, for manipulating samples how I like to, so they aren’t as useful for my practice.

## “Just Train Your Own model…? OK!”

We could retrain our own models from scratch… if we had all the data and computing required for high quality music/audio generation, and if we were comfortable with the environmental overhead. But it would be much better if we had ways of reusing what is already there. Big AI models are bad because they’re big and flattening, but they’re also performant because of this ability to generalise. If we did our own, they’d be small, bad, or take ages and lots of hacking to work…. Monica Dinculescu from Google's Magenta says ‘it'd be like trying to learn all of music theory from a single song’[^6]

So it would be cool to personalise existing models on our own samples, and with control attributes of our choice. MALT is a system for quickly training such a small, personalised control model. Based on prior work[^7], it works by learning a small subspace from an existing VAE, then regularising in the loss until that subspace 'makes sense'.

I implemented this in a [max patch](https://github.com/ashNotKetchup/Timbre-Slider/) so that everything from training to music making can happen on one machine… your data never leaves your computer.

(Check back! I'll update this page with a more detailed outline soon)

<!-- %% ## Constraining Neural Audio Codecs

neural audio codecs, or …. other models that use vae-like architectures, compress sound into a ‘latent space’, which is a high dimensional space of potential events. In its simplest form, this is just a probability distribution, each point of which corresponds to a potential sound. For example, in RAVE…. In stable audio open……

The organisation of sounds in this latent space can be controlled by…..

However, mostly, these models prioritise generalisability (SAO) or particular artist contexts… (Holly herndon after)….

We want to use these existing generative models, but with our own, simpler controls, based on our own music.

We can do this by learing a subspace, and by forcing this space to obey some attribute based rules….

## Subspaces

midime, super sliders. but these are unlabelled….

## Attribute Monotonisation

# App and Examples

# Prior Work %% -->

[^1]: [XO](https://www.xlnaudio.com/products/xo) is probably the simplest example of this
[^2]: eg [Synplant](https://soniccharge.com/synplant)
[^3]: Generative timbre spaces by Esling et al.
[^4]: RAVE by Caillon et al.
[^5]: Music2Latent by Pasini et al.
[^6]: https://magenta.withgoogle.com/midi-me
[^7]: Latent Constraints by Engel et al. and MusicVAE by Pati and Lerch